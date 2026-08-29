# Interne Lead-Benachrichtigung

Die Cloudflare-Funktion sendet nach erfolgreicher Speicherung eine interne Nachricht mit Vorgangs-ID, Service, Kontaktweg, Upload-Verweisen und strukturierten Angaben. Der Versand ist an vorhandene Umgebungsvariablen gebunden; ohne Mail-Konfiguration bleibt der gespeicherte Lead erhalten.

Die Nachricht dient der Sichtung, nicht der automatischen Kundenentscheidung. HTML-Ausgabe wird escaped, Uploads werden als Metadaten referenziert und technische Geheimnisse werden durch die Payload-Bereinigung ausgeschlossen.
