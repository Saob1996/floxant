"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, MessageSquare, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";

import { company } from "@/lib/company";

const serviceLinks = [
  { href: "/umzug", label: "Umzug" },
  { href: "/reinigung", label: "Reinigung" },
  { href: "/firmenentsorgung", label: "Firmenentsorgung" },
  { href: "/entruempelung", label: "Entrümpelung" },
  { href: "/bueroumzug", label: "Büroumzug" },
  { href: "/gewerbereinigung-regensburg", label: "Gewerbereinigung" },
  { href: "/private-client-service", label: "Private Client" },
];

const directLinks = [
  { href: "/buchung", label: "Buchung" },
  { href: "/rechner", label: "Rechner" },
  { href: "/anfrage-mit-preisrahmen", label: "Budget nennen" },
  { href: "/angebot-guenstiger-pruefen", label: "Günstiger prüfen" },
  { href: "/express-anfrage", label: "Express-Check" },
  { href: "/empfehlen", label: "Empfehlen" },
  { href: "/makler-vermieter-link", label: "Makler/Vermieter" },
  { href: "/schadensbegrenzung", label: "Schadensbegrenzung" },
  { href: "/keller-muellraum-rettung-regensburg", label: "Keller/Müllraum" },
  { href: "/leerfahrt-rueckfahrt", label: "Leer-Rückfahrt" },
  { href: "/wohnung-wieder-vermietbar", label: "Objekt-Ready" },
  { href: "/uebergabeakte", label: "Übergabeakte" },
  { href: "/kontakt", label: "Kontakt" },
];

const localLinks = [
  { href: "/umzug-regensburg", label: "Umzug Regensburg" },
  { href: "/reinigung-regensburg", label: "Reinigung Regensburg" },
  { href: "/entruempelung-regensburg", label: "Entrümpelung Regensburg" },
  { href: "/bueroumzug-regensburg", label: "Büroumzug Regensburg" },
  { href: "/service-area-bayern", label: "Bayern" },
  { href: "/standorte", label: "Standorte" },
];

const knowledgeLinks = [
  { href: "/blog", label: "Ratgeber-Hub" },
  { href: "/blog/umzug-kosten-regensburg", label: "Umzugskosten" },
  { href: "/blog/wohnungsuebergabe-regensburg-vorbereiten", label: "Wohnungsübergabe" },
  { href: "/blog/reinigungsfirma-regensburg-buero-praxis-auswahl", label: "Reinigungsfirma wählen" },
  { href: "/leistungen-vergleichen", label: "Leistungen vergleichen" },
  { href: "/anbieter-vergleichen", label: "Anbieter vergleichen" },
  { href: "/praxisfaelle", label: "Praxisfälle" },
  { href: "/kostenfaktoren", label: "Kostenfaktoren" },
];

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/buchungsbedingungen", label: "Buchungsbedingungen" },
  { href: "/widerruf", label: "Widerruf" },
  { href: "/sitemap.xml", label: "Sitemap XML" },
];

const multilingualServiceAreas = [
  {
    area: "Regensburg & Bayern",
    badge: "Alle Haupt- und Spezialservices",
    intro:
      "Für Regensburg, den ca. 200-km-Umkreis rund um Regensburg und Bayern: Umzug, Reinigung, Entrümpelung, Transport, Übergabe, Objektservice, Entsorgung und Spezialanfragen nach Verfügbarkeit.",
    serviceClusters: [
      {
        title: "Umzug & Transport",
        items: [
          "Umzug Regensburg",
          "Umzug Bayern",
          "Umzugsunternehmen Regensburg",
          "Büroumzug",
          "Seniorenumzug",
          "Studentenumzug",
          "Familienumzug",
          "kurzfristiger Umzug",
          "24h-Umzugsservice",
          "diskreter Umzug",
          "Kleintransport",
          "Klaviertransport",
          "Leer-Rückfahrt / Rückladung",
        ],
      },
      {
        title: "Reinigung & Übergabe",
        items: [
          "Reinigung Regensburg",
          "Endreinigung",
          "Gewerbereinigung",
          "Büroreinigung",
          "Unterhaltsreinigung",
          "Umzug mit Reinigung",
          "Schlüsselübergabe",
          "Übergabeprotokoll",
          "Übergabeakte",
          "Wohnung wieder vermietbar",
        ],
      },
      {
        title: "Entrümpelung, Entsorgung & Objekt",
        items: [
          "Entrümpelung Regensburg",
          "Wohnungsauflösung",
          "Nachlass-Räumung",
          "Firmenentsorgung",
          "Kleinmengen-Entsorgung",
          "Keller-/Müllraum-Rettung",
          "Immobilie verkaufsbereit machen",
          "Mieterwechsel-Service",
          "Einlagerung",
          "Akteneinlagerung",
        ],
      },
      {
        title: "Planung & Prüfung",
        items: [
          "Halteverbotszone",
          "Plan-B-Service",
          "Schadensbegrenzung",
          "Angebotscheck",
          "Preisrahmen prüfen",
          "Rechner",
          "Express-Anfrage",
          "Makler-/Vermieter-Link",
          "Private Client",
        ],
      },
    ],
    groups: [
      {
        language: "English",
        lang: "en",
        terms: [
          "moving company Regensburg",
          "local movers Regensburg",
          "moving service Bavaria",
          "office move Regensburg",
          "senior moving service Bavaria",
          "student moving Regensburg",
          "short notice move Regensburg",
          "emergency moving Bavaria",
          "discreet move Regensburg",
          "small transport Regensburg",
          "piano transport Regensburg",
          "backload transport Bavaria",
          "cleaning service Regensburg",
          "move-out cleaning Regensburg",
          "end cleaning Regensburg",
          "office cleaning Regensburg",
          "commercial cleaning Regensburg",
          "decluttering Regensburg",
          "apartment clearance Regensburg",
          "estate clearance Regensburg",
          "company disposal Regensburg",
          "small waste disposal Regensburg",
          "basement clearance Regensburg",
          "storage service Regensburg",
          "file storage Regensburg",
          "no parking zone Regensburg",
          "key handover service",
          "handover protocol service",
          "apartment handover service Regensburg",
          "rental ready apartment Regensburg",
          "property ready service Bavaria",
          "offer check moving cleaning disposal",
          "moving cost calculator Regensburg",
          "Plan B moving service Bavaria",
          "damage control service Regensburg",
          "moving support Regensburg",
        ],
      },
      {
        language: "Русский",
        lang: "ru",
        terms: [
          "переезд Регенсбург",
          "компания по переезду Регенсбург",
          "переезд Бавария",
          "офисный переезд Регенсбург",
          "переезд для пожилых Бавария",
          "студенческий переезд Регенсбург",
          "срочный переезд Регенсбург",
          "небольшая перевозка Регенсбург",
          "перевозка пианино Регенсбург",
          "обратная загрузка Бавария",
          "клининговая компания Регенсбург",
          "финальная уборка Регенсбург",
          "уборка офиса Регенсбург",
          "коммерческая уборка Регенсбург",
          "расхламление Регенсбург",
          "освобождение квартиры Регенсбург",
          "вывоз вещей Регенсбург",
          "утилизация для компаний Регенсбург",
          "уборка подвала Регенсбург",
          "складское хранение Регенсбург",
          "запрет парковки для переезда Регенсбург",
          "передача ключей сервис",
          "акт передачи квартиры",
          "подготовка к передаче квартиры Регенсбург",
          "квартира готова к сдаче Регенсбург",
          "проверка предложения переезд уборка",
          "калькулятор стоимости переезда Регенсбург",
          "план Б сервис переезда Бавария",
          "экстренная помощь при переезде Регенсбург",
        ],
      },
      {
        language: "中文",
        lang: "zh",
        terms: [
          "雷根斯堡搬家公司",
          "巴伐利亚搬家服务",
          "雷根斯堡办公室搬迁",
          "巴伐利亚老人搬家",
          "雷根斯堡学生搬家",
          "雷根斯堡紧急搬家",
          "雷根斯堡小型运输",
          "雷根斯堡钢琴搬运",
          "巴伐利亚回程运输",
          "雷根斯堡清洁公司",
          "雷根斯堡退房清洁",
          "雷根斯堡最终清洁",
          "雷根斯堡办公室清洁",
          "雷根斯堡商业清洁",
          "雷根斯堡清理服务",
          "雷根斯堡公寓清空",
          "雷根斯堡遗产清理",
          "雷根斯堡公司物品处理",
          "雷根斯堡少量废弃物处理",
          "雷根斯堡地下室清理",
          "雷根斯堡仓储服务",
          "雷根斯堡搬家禁停区",
          "钥匙交接服务",
          "房屋交接记录",
          "雷根斯堡交房准备",
          "雷根斯堡出租前准备",
          "巴伐利亚房产出售前准备",
          "搬家清洁处理报价检查",
          "雷根斯堡搬家费用计算器",
          "巴伐利亚搬家备用方案",
        ],
      },
      {
        language: "한국어",
        lang: "ko",
        terms: [
          "레겐스부르크 이사 업체",
          "바이에른 이사 서비스",
          "레겐스부르크 사무실 이사",
          "바이에른 시니어 이사",
          "레겐스부르크 학생 이사",
          "레겐스부르크 긴급 이사",
          "레겐스부르크 소형 운송",
          "레겐스부르크 피아노 운송",
          "바이에른 귀로 운송",
          "레겐스부르크 청소 업체",
          "레겐스부르크 퇴거 청소",
          "레겐스부르크 최종 청소",
          "레겐스부르크 사무실 청소",
          "레겐스부르크 상업 청소",
          "레겐스부르크 정리 서비스",
          "레겐스부르크 주거 정리",
          "레겐스부르크 유품 정리",
          "레겐스부르크 회사 폐기",
          "레겐스부르크 소량 폐기",
          "레겐스부르크 지하실 정리",
          "레겐스부르크 보관 서비스",
          "레겐스부르크 주차금지 구역",
          "열쇠 인계 서비스",
          "주택 인계 기록",
          "레겐스부르크 퇴거 준비",
          "레겐스부르크 임대 준비",
          "바이에른 부동산 판매 준비",
          "이사 청소 폐기 견적 확인",
          "레겐스부르크 이사 비용 계산기",
          "바이에른 이사 플랜 B",
        ],
      },
    ],
  },
  {
    area: "Düsseldorf",
    badge: "Reinigung + Entsorgung getrennt",
    intro:
      "Für Düsseldorf ist FLOXANT getrennt positioniert: Reinigung und vorhandene Entsorgung nach Prüfung. Keine lokale Transport- oder Wohnortwechsel-Optimierung.",
    serviceClusters: [
      {
        title: "Reinigung Düsseldorf",
        items: [
          "Wohnungsreinigung",
          "möblierte Wohnung reinigen",
          "Gästewechsel",
          "Endreinigung",
          "Grundreinigung",
          "Büroreinigung",
          "B2B-Reinigung",
          "Treppenhausreinigung",
          "Übergabereinigung",
        ],
      },
      {
        title: "Entsorgung Düsseldorf",
        items: [
          "Möbelentsorgung",
          "Sperrmüll-Abholung",
          "Haushaltsgegenstände",
          "Entsorgung nach Auszug",
          "kleine Räumung nach Prüfung",
          "Büromöbel und Inventar",
          "Kombination mit Reinigung nach Bedarf",
        ],
      },
      {
        title: "Koordination nach Absprache",
        items: [
          "Fotos senden",
          "Zeitfenster klären",
          "Zugang klären",
          "Schlüsselkoordination",
          "Inventarhinweis",
          "Frequenz bei B2B",
          "Budget nennen",
        ],
      },
    ],
    groups: [
      {
        language: "English",
        lang: "en",
        terms: [
          "cleaning service Dusseldorf",
          "apartment cleaning Dusseldorf",
          "furnished apartment cleaning Dusseldorf",
          "guest changeover cleaning Dusseldorf",
          "move-out cleaning Dusseldorf",
          "end of tenancy cleaning Dusseldorf",
          "deep cleaning Dusseldorf",
          "office cleaning Dusseldorf",
          "B2B cleaning Dusseldorf",
          "staircase cleaning Dusseldorf",
          "handover cleaning Dusseldorf",
          "furniture disposal Dusseldorf",
          "bulky waste pickup Dusseldorf",
          "household item disposal Dusseldorf",
          "office furniture disposal Dusseldorf",
          "disposal after move-out Dusseldorf",
          "cleaning and disposal Dusseldorf",
          "cleaning with key coordination Dusseldorf",
          "cleaning photos estimate Dusseldorf",
        ],
      },
      {
        language: "Русский",
        lang: "ru",
        terms: [
          "уборка Дюссельдорф",
          "уборка квартиры Дюссельдорф",
          "уборка меблированной квартиры Дюссельдорф",
          "уборка после гостей Дюссельдорф",
          "финальная уборка Дюссельдорф",
          "генеральная уборка Дюссельдорф",
          "уборка офиса Дюссельдорф",
          "B2B уборка Дюссельдорф",
          "уборка лестничной клетки Дюссельдорф",
          "уборка перед передачей квартиры Дюссельдорф",
          "утилизация мебели Дюссельдорф",
          "вывоз крупногабаритного мусора Дюссельдорф",
          "утилизация вещей после выезда Дюссельдорф",
          "вывоз офисной мебели Дюссельдорф",
          "уборка и утилизация Дюссельдорф",
          "уборка с координацией ключей Дюссельдорф",
        ],
      },
      {
        language: "中文",
        lang: "zh",
        terms: [
          "杜塞尔多夫清洁服务",
          "杜塞尔多夫公寓清洁",
          "杜塞尔多夫带家具公寓清洁",
          "杜塞尔多夫客人更换清洁",
          "杜塞尔多夫退房清洁",
          "杜塞尔多夫深度清洁",
          "杜塞尔多夫办公室清洁",
          "杜塞尔多夫B2B清洁",
          "杜塞尔多夫楼梯间清洁",
          "杜塞尔多夫交房清洁",
          "杜塞尔多夫家具处理",
          "杜塞尔多夫大件垃圾清运",
          "杜塞尔多夫搬出后物品处理",
          "杜塞尔多夫办公家具处理",
          "杜塞尔多夫清洁和处理",
          "杜塞尔多夫钥匙协调清洁",
        ],
      },
      {
        language: "한국어",
        lang: "ko",
        terms: [
          "뒤셀도르프 청소 서비스",
          "뒤셀도르프 아파트 청소",
          "뒤셀도르프 가구 있는 집 청소",
          "뒤셀도르프 게스트 교체 청소",
          "뒤셀도르프 퇴거 청소",
          "뒤셀도르프 딥클리닝",
          "뒤셀도르프 사무실 청소",
          "뒤셀도르프 B2B 청소",
          "뒤셀도르프 계단 청소",
          "뒤셀도르프 인계 청소",
          "뒤셀도르프 가구 폐기",
          "뒤셀도르프 대형 폐기물 수거",
          "뒤셀도르프 퇴거 후 폐기",
          "뒤셀도르프 사무용 가구 폐기",
          "뒤셀도르프 청소와 폐기",
          "뒤셀도르프 열쇠 조율 청소",
        ],
      },
    ],
  },
];

export function Footer({ dic }: { dic?: any } = {}) {
  const pathname = usePathname();

  if (pathname === "/private-client-service" || pathname === "/villenservice") return null;

  return (
    <footer className="relative overflow-hidden px-6 pb-12 pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.06),transparent_30%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]" />
      <div className="relative mx-auto max-w-7xl space-y-6">
        <section className="flox-panel-dark rounded-[2.2rem] px-7 py-8 md:px-10 md:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="flox-kicker border-white/10 bg-white/5 text-cyan-200">
                Letzter klarer Schritt
              </div>
              <h2 className="mt-6 max-w-3xl text-[clamp(2.1rem,4vw,4rem)] font-bold tracking-[-0.025em] text-white">
                Lieber direkt sauber anfragen als später alles doppelt erklären.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                FLOXANT führt Anfrage, Preisgefühl und Ausführung ruhig zusammen.
                Wenn es konkret wird, lieber direkt, klar und mit genug Angaben.
              </p>
            </div>

            <div className="flox-cta-choice-grid">
              <Link
                href="/buchung"
                className="flox-cta-choice flox-cta-choice-primary"
              >
                <span className="flox-cta-choice-icon">
                  <ArrowRight className="h-5 w-5" />
                </span>
                <span className="flox-cta-choice-body">
                  <span className="flox-cta-choice-eyebrow">Anfrageweg</span>
                  <span className="flox-cta-choice-title">Anfrage starten</span>
                  <span className="flox-cta-choice-copy">Buchung öffnen</span>
                </span>
                <span className="flox-cta-choice-arrow">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <a
                href={`https://wa.me/${company.phoneRaw.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flox-cta-choice flox-cta-choice-whatsapp"
              >
                <span className="flox-cta-choice-icon">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <span className="flox-cta-choice-body">
                  <span className="flox-cta-choice-eyebrow">Sofortkontakt</span>
                  <span className="flox-cta-choice-title">WhatsApp schreiben</span>
                  <span className="flox-cta-choice-copy">{company.phone}</span>
                </span>
                <span className="flox-cta-choice-arrow">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="flox-panel rounded-[2.2rem] px-7 py-8 md:px-10 md:py-10">
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-[1.25fr_0.9fr_0.9fr_0.95fr_1.05fr_0.85fr]">
            <div className="xl:border-r xl:border-slate-200/80 xl:pr-8">
              <Link href="/" className="text-2xl font-black tracking-[0.16em] text-slate-950" translate="no">
                FLOXANT
              </Link>
              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-700">
                Umzug, Reinigung, Entrümpelung und Übergabevorbereitung mit klarer
                Abstimmung, realistischer Prüfung und sichtbaren nächsten Schritten.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <div className="flox-metric">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-blue-700" />
                    Adresse
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-7 text-slate-900">{company.address}</p>
                </div>

                <div className="flox-metric">
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                    Direktkontakt
                  </div>
                  <div className="mt-3 space-y-1 text-sm font-semibold text-slate-900">
                    <a href={`mailto:${company.email}`} className="block hover:text-blue-700">
                      {company.email}
                    </a>
                    <a href={`tel:${company.phoneRaw}`} className="block hover:text-blue-700">
                      {company.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <FooterColumn title="Leistungen" items={serviceLinks} />
            <FooterColumn title="Direkte Wege" items={directLinks} />
            <FooterColumn title="Lokale Seiten" items={localLinks} />
            <FooterColumn title="Ratgeber" items={knowledgeLinks} />
            <FooterColumn title="Recht & Technik" items={legalLinks} />
          </div>

          <div className="mt-8 rounded-[1.65rem] border border-slate-200 bg-slate-50 p-5">
            <div className="grid gap-5 lg:grid-cols-[0.68fr_1.32fr] lg:items-start">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700">
                  Internationale Suchhilfe
                </div>
                <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                  FLOXANT finden, auch wenn Sie anders suchen.
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Diese sichtbare Sprachhilfe verbindet internationale Suchbegriffe mit den deutschen FLOXANT-Servicewegen. Regensburg/Bayern und Düsseldorf bleiben bewusst getrennt.
                </p>
              </div>

              <div className="space-y-4">
                {multilingualServiceAreas.map((area) => (
                  <article key={area.area} className="rounded-[1.35rem] border border-white bg-white p-4 shadow-sm shadow-slate-950/5">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="text-base font-black text-slate-950">{area.area}</div>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{area.intro}</p>
                      </div>
                      <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700">
                        {area.badge}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {area.serviceClusters.map((cluster) => (
                        <div key={cluster.title} className="rounded-[1rem] border border-slate-200 bg-slate-50 p-3">
                          <div className="text-[10px] font-black uppercase tracking-[0.12em] text-blue-700">
                            {cluster.title}
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {cluster.items.map((service) => (
                              <span key={service} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {area.groups.map((group) => (
                        <details
                          key={`${area.area}-${group.language}`}
                          className="group rounded-[1rem] border border-slate-200 bg-slate-50 px-3 py-2"
                          open={group.lang === "en"}
                        >
                          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-black text-slate-900">
                            <span lang={group.lang}>{group.language}</span>
                            <span className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 group-open:text-blue-700">
                              Suchbegriffe
                            </span>
                          </summary>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {group.terms.map((term) => (
                              <span
                                key={term}
                                lang={group.lang}
                                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700"
                              >
                                {term}
                              </span>
                            ))}
                          </div>
                        </details>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-slate-200/90 pt-7 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                Versicherter Transport und saubere Planung
              </div>
              <Link href="/llms.txt" className="text-sm font-semibold text-slate-500 hover:text-blue-700">
                LLMs.txt
              </Link>
              <Link href="/service-graph.json" className="text-sm font-semibold text-slate-500 hover:text-blue-700">
                Service Graph
              </Link>
              <Link href="/sitemap.xml" className="text-sm font-semibold text-slate-500 hover:text-blue-700">
                Sitemap
              </Link>
            </div>

            <div className="flex items-center gap-5">
              <Link
                href="/login"
                rel="nofollow"
                className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-500 hover:text-blue-700"
              >
                Admin Login
              </Link>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                © 2026 FLOXANT
              </span>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: Array<{ href: string; label: string }>;
}) {
  return (
    <div>
      <div className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-blue-700">{title}</div>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex items-center justify-between rounded-[1.15rem] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
          >
            <span>{item.label}</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-700" />
          </Link>
        ))}
      </div>
    </div>
  );
}
