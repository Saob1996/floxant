"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Trash2, WalletCards, ArrowDownRight, ArrowUpRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Transaction {
 id: string;
 date: string;
 description: string;
 category: string;
 amount: number;
 type: "income" | "expense";
}

const CATEGORIES = [
 "Kundeneinnahme",
 "Spritkosten",
 "Personalkosten",
 "Material & Reinigungsmittel",
 "Fahrzeugmiete / Leasing",
 "Versicherung",
 "Marketing & Ads",
 "Sonstiges",
];

export function IncomeExpenseTracker() {
 const [transactions, setTransactions] = useState<Transaction[]>([]);
 const [isMounted, setIsMounted] = useState(false);
 const [filterMonth, setFilterMonth] = useState<string>(
  new Date().toISOString().substring(0, 7) // YYYY-MM
 );

 // New Transaction Form State
 const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
 const [description, setDescription] = useState("");
 const [category, setCategory] = useState(CATEGORIES[0]);
 const [amount, setAmount] = useState<number | "">("");
 const [type, setType] = useState<"income" | "expense">("income");

 useEffect(() => {
  setIsMounted(true);
  const saved = localStorage.getItem("floxant_income_expense");
  if (saved) {
   try {
    setTransactions(JSON.parse(saved));
   } catch (e) {
    console.error("Failed to parse transactions");
   }
  }
 }, []);

 useEffect(() => {
  if (isMounted) {
   localStorage.setItem("floxant_income_expense", JSON.stringify(transactions));
  }
 }, [transactions, isMounted]);

 const handleAdd = (e: React.FormEvent) => {
  e.preventDefault();
  if (!description || !amount || Number(amount) <= 0) return;

  const newTx: Transaction = {
   id: crypto.randomUUID(),
   date,
   description,
   category,
   amount: Number(amount),
   type,
  };

  setTransactions((prev) => [newTx, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  setDescription("");
  setAmount("");
 };

 const handleDelete = (id: string) => {
  if (confirm("Eintrag wirklich löschen?")) {
   setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }
 };

 const filteredTransactions = transactions.filter((tx) => tx.date.startsWith(filterMonth));

 const totalIncome = filteredTransactions
  .filter((tx) => tx.type === "income")
  .reduce((sum, tx) => sum + tx.amount, 0);

 const totalExpense = filteredTransactions
  .filter((tx) => tx.type === "expense")
  .reduce((sum, tx) => sum + tx.amount, 0);

 const profit = totalIncome - totalExpense;

 if (!isMounted) return null;

 return (
  <div className="space-y-6">
   {/* Summary Cards */}
   <div className="grid gap-4 md:grid-cols-3">
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
     <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
      <ArrowUpRight className="h-4 w-4 text-emerald-500" />
      Einnahmen
     </div>
     <div className="mt-2 text-2xl font-black text-slate-900">{totalIncome.toFixed(2)} €</div>
    </div>
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
     <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
      <ArrowDownRight className="h-4 w-4 text-red-500" />
      Ausgaben
     </div>
     <div className="mt-2 text-2xl font-black text-slate-900">{totalExpense.toFixed(2)} €</div>
    </div>
    <div
     className={cn(
      "rounded-[1.5rem] border p-5 shadow-sm",
      profit >= 0 ? "border-emerald-200 bg-emerald-50" : "border-red-200 bg-red-50"
     )}
    >
     <div
      className={cn(
       "flex items-center gap-2 text-sm font-semibold",
       profit >= 0 ? "text-emerald-700" : "text-red-700"
      )}
     >
      <WalletCards className="h-4 w-4" />
      Gewinn / Verlust
     </div>
     <div
      className={cn(
       "mt-2 text-3xl font-black tracking-tight",
       profit >= 0 ? "text-emerald-700" : "text-red-700"
      )}
     >
      {profit.toFixed(2)} €
     </div>
    </div>
   </div>

   <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
    {/* Table Area */}
    <div className="rounded-[1.5rem] border border-slate-200 bg-white shadow-sm overflow-hidden">
     <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-4">
      <h3 className="font-bold text-slate-800">Transaktionen</h3>
      <input
       type="month"
       aria-label="Monat filtern"
       value={filterMonth}
       onChange={(e) => setFilterMonth(e.target.value)}
       className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-400"
      />
     </div>
     
     {filteredTransactions.length === 0 ? (
      <div className="p-12 text-center text-sm text-slate-500">
       Keine Einträge für diesen Monat gefunden.
      </div>
     ) : (
      <div className="overflow-x-auto">
       <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
         <tr>
          <th className="px-4 py-3 font-semibold">Datum</th>
          <th className="px-4 py-3 font-semibold">Beschreibung</th>
          <th className="px-4 py-3 font-semibold">Kategorie</th>
          <th className="px-4 py-3 text-right font-semibold">Betrag</th>
          <th className="px-4 py-3"></th>
         </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
         {filteredTransactions.map((tx) => (
          <tr key={tx.id} className="hover:bg-slate-50">
           <td className="px-4 py-3 whitespace-nowrap">{new Date(tx.date).toLocaleDateString("de-DE")}</td>
           <td className="px-4 py-3 font-medium text-slate-900">{tx.description}</td>
           <td className="px-4 py-3">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
             {tx.category}
            </span>
           </td>
           <td
            className={cn(
             "px-4 py-3 text-right font-bold whitespace-nowrap",
             tx.type === "income" ? "text-emerald-600" : "text-red-600"
            )}
           >
            {tx.type === "income" ? "+" : "-"}{tx.amount.toFixed(2)} €
           </td>
           <td className="px-4 py-3 text-right">
            <button
             onClick={() => handleDelete(tx.id)}
             className="text-slate-400 hover:text-red-500 transition"
            >
             <Trash2 className="h-4 w-4" />
            </button>
           </td>
          </tr>
         ))}
        </tbody>
       </table>
      </div>
     )}
    </div>

    {/* Add Entry Form */}
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm h-fit">
     <h3 className="mb-4 font-bold text-slate-800">Neuer Eintrag</h3>
     <form onSubmit={handleAdd} className="space-y-4 text-sm">
      <div className="flex rounded-xl bg-slate-100 p-1">
       <button
        type="button"
        onClick={() => setType("income")}
        className={cn(
         "flex-1 rounded-lg py-1.5 font-semibold transition",
         type === "income" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
        )}
       >
        Einnahme
       </button>
       <button
        type="button"
        onClick={() => setType("expense")}
        className={cn(
         "flex-1 rounded-lg py-1.5 font-semibold transition",
         type === "expense" ? "bg-white text-red-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
        )}
       >
        Ausgabe
       </button>
      </div>

      <label className="block">
       Datum
       <input
        type="date"
        required
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
       />
      </label>

      <label className="block">
       Beschreibung
       <input
        type="text"
        required
        placeholder="z.B. Reinigung Büro Meier"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
       />
      </label>

      <label className="block">
       Kategorie
       <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
       >
        {CATEGORIES.map((cat) => (
         <option key={cat}>{cat}</option>
        ))}
       </select>
      </label>

      <label className="block">
       Betrag (€)
       <input
        type="number"
        step="0.01"
        required
        min="0.01"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
        className="mt-1 h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 outline-none focus:border-blue-300 focus:bg-white"
       />
      </label>

      <button
       type="submit"
       className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 font-bold text-foreground transition hover:bg-blue-500"
      >
       <PlusCircle className="h-4 w-4" />
       Eintragen
      </button>
     </form>
    </div>
   </div>
  </div>
 );
}
