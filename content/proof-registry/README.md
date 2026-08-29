# FLOXANT Beleg-Registry

`registry.json` enthält ausschließlich reale, intern geprüfte Nachweise. Ein Datensatz darf öffentlich verarbeitet werden, wenn `verified` und `publicAllowed` wahr sind, `anonymized` wahr ist und `customerConsent` entweder `documented` oder `not_required` lautet.

Nicht zulässig sind erfundene Projektberichte, automatisch erzeugte Kundenzitate, genaue Privatadressen, Zugangsdaten, vertrauliche Dokumente oder Bilder ohne geklärte Rechte. Ein Eintrag in der Registry veröffentlicht noch nichts: Die öffentliche Einbindung bleibt eine separate, manuell geprüfte redaktionelle Änderung.

Vor jeder Freigabe ist `node scripts/audit-proof-registry.js` auszuführen. Die Registry startet absichtlich leer.
