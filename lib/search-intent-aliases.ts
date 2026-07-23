// @ts-nocheck
export type SearchIntentAliasLanguage = "en" | "ru" | "zh" | "ko";

export type SearchIntentAliasGroup = {
  id: string;
  market: "regensburg" | "regensburg-cleaning";
  serviceScope: string[];
  canonicalPages: string[];
  excludedIntents?: string[];
  aliases: Array<{
    language: SearchIntentAliasLanguage;
    label: string;
    terms: string[];
  }>;
};

export const multilingualSearchIntentGroups: SearchIntentAliasGroup[] = [
  {
    id: "moving-regensburg-bayern",
    market: "regensburg-bayern",
    serviceScope: ["Umzug", "Umzugsunternehmen", "Büroumzug", "Transport", "Beiladung", "Leer-Rückfahrt"],
    canonicalPages: ["/regensburg/umzugsunternehmen", "/regensburg/umzug", "/regensburg/umzug", "/umzug-bayern", "/bueroumzug", "/kleintransport-regensburg", "/leerfahrt-rueckfahrt", "/beiladung"],
    aliases: [
      {
        language: "en",
        label: "Englische Suchbegriffe",
        terms: ["moving service Regensburg", "moving company Regensburg", "relocation service Bavaria", "office move Regensburg", "small transport Regensburg", "return load Bavaria"],
      },
      {
        language: "ru",
        label: "Russische Suchbegriffe",
        terms: ["переезд Регенсбург", "транспорт Регенсбург", "переезд Бавария", "офисный переезд Регенсбург"],
      },
      {
        language: "zh",
        label: "Chinesische Suchbegriffe",
        terms: ["雷根斯堡搬家", "巴伐利亚搬家服务", "雷根斯堡办公室搬迁", "雷根斯堡小型运输"],
      },
      {
        language: "ko",
        label: "Koreanische Suchbegriffe",
        terms: ["레겐스부르크 이사", "바이에른 이사 서비스", "레겐스부르크 사무실 이사", "레겐스부르크 소형 운송"],
      },
    ],
  },
  {
    id: "cleaning-regensburg",
    market: "regensburg-bayern",
    serviceScope: ["Reinigung", "Endreinigung", "Gewerbereinigung", "Büroreinigung", "Büroreinigung Regensburg", "Büroreinigung Regensburg Angebot", "Büroreinigung Kosten Regensburg", "Büro Reinigungskraft Regensburg", "Büroreinigung nach Feierabend Regensburg", "Praxisreinigung Regensburg", "Arztpraxis Reinigung Regensburg", "Praxisreinigung Angebot Regensburg", "Reinigung Praxisräume Regensburg", "Praxisreinigung nach Praxisschluss Regensburg", "Hotelreinigung Regensburg", "Hotel Reinigung Firma Regensburg", "Zimmerreinigung Regensburg", "Hotel Unterhaltsreinigung Regensburg", "Pension Reinigung Regensburg", "Boardinghouse Reinigung Regensburg", "Lobby Reinigung Regensburg", "Fensterreinigung Regensburg", "Glasreinigung Regensburg", "Baureinigung Regensburg", "Bauendreinigung Regensburg", "Baufeinreinigung Regensburg", "Reinigung nach Renovierung Regensburg", "Handwerkerstaub entfernen Regensburg", "Teppichreinigung Regensburg", "Teppichbodenreinigung Regensburg", "Polsterreinigung Regensburg", "Sofa reinigen lassen Regensburg", "Bürostühle reinigen Regensburg", "Treppenhausreinigung Regensburg", "Hausverwaltung Reinigung Regensburg", "Treppenhausreinigung Kosten Regensburg", "Treppenhaus reinigen lassen Regensburg", "WEG Reinigung Regensburg", "Mehrfamilienhaus Reinigung Regensburg", "Unterhaltsreinigung Regensburg", "Grundreinigung Regensburg", "Wohnung Grundreinigung Regensburg", "Büro Grundreinigung Regensburg", "Grundreinigung nach Auszug Regensburg", "starke Verschmutzung reinigen Regensburg", "Reinigungsplan Buero Regensburg", "Objektreinigung Regensburg", "Übergabereinigung", "Notfallreinigung", "Reinigung nach Veranstaltung"],
    canonicalPages: ["/regensburg/reinigung", "/regensburg/reinigungsfirma", "/regensburg/bueroreinigung", "/angebot-vergleichen-regensburg", "/regensburg/reinigung", "/regensburg/bueroreinigung", "/praxisreinigung-regensburg", "/hotelreinigung-regensburg", "/fensterreinigung-regensburg", "/baureinigung-regensburg", "/teppichreinigung-regensburg", "/treppenhausreinigung-regensburg", "/unterhaltsreinigung-regensburg", "/grundreinigung-regensburg", "/notfallreinigung-24h", "/reinigung-nach-veranstaltung", "/regensburg/reinigung", "/regensburg/gewerbereinigung", "/umzug-mit-reinigung", "/wohnung-wieder-vermietbar"],
    aliases: [
      {
        language: "en",
        label: "Englische Suchbegriffe",
        terms: ["cleaning service Regensburg", "office cleaning Regensburg", "office cleaning quote Regensburg", "office cleaning cost Regensburg", "office cleaner Regensburg", "after hours office cleaning Regensburg", "medical office cleaning Regensburg", "doctor office cleaning Regensburg", "practice cleaning quote Regensburg", "after hours practice cleaning Regensburg", "hotel cleaning Regensburg", "hotel room cleaning Regensburg", "guesthouse cleaning Regensburg", "boardinghouse cleaning Regensburg", "lobby cleaning Regensburg", "window cleaning Regensburg", "glass cleaning Regensburg", "post construction cleaning Regensburg", "construction cleaning Regensburg", "builders clean Regensburg", "renovation cleaning Regensburg", "construction final cleaning Regensburg", "remove construction dust Regensburg", "carpet cleaning Regensburg", "office carpet cleaning Regensburg", "upholstery cleaning Regensburg", "sofa cleaning Regensburg", "staircase cleaning Regensburg", "apartment building cleaning Regensburg", "property management cleaning Regensburg", "common area cleaning Regensburg", "deep cleaning Regensburg", "apartment deep cleaning Regensburg", "office deep cleaning Regensburg", "move out deep cleaning Regensburg", "maintenance cleaning Regensburg", "regular office cleaning Regensburg", "cleaning schedule office Regensburg", "emergency cleaning Regensburg", "event cleaning Bavaria", "party cleaning Regensburg", "end cleaning Bavaria", "apartment handover cleaning Regensburg"],
      },
      {
        language: "ru",
        label: "Russische Suchbegriffe",
        terms: ["уборка Регенсбург", "клининговая компания Регенсбург", "офисная уборка Регенсбург", "финальная уборка Бавария"],
      },
      {
        language: "zh",
        label: "Chinesische Suchbegriffe",
        terms: ["雷根斯堡清洁", "雷根斯堡清洁公司", "雷根斯堡办公室清洁", "巴伐利亚退房清洁"],
      },
      {
        language: "ko",
        label: "Koreanische Suchbegriffe",
        terms: ["레겐스부르크 청소", "레겐스부르크 청소 업체", "레겐스부르크 사무실 청소", "바이에른 퇴거 청소"],
      },
    ],
  },
  {
    id: "clearance-disposal-regensburg-bayern",
    market: "regensburg-bayern",
    serviceScope: ["Entrümpelung", "Wohnungsauflösung", "Nachlass-Räumung", "Entsorgung", "Firmenentsorgung"],
    canonicalPages: ["/regensburg/wohnungsaufloesung", "/regensburg/entruempelung", "/regensburg/entruempelung", "/entruempelung-bayern", "/regensburg/wohnungsaufloesung", "/nachlass-raeumung-regensburg", "/firmenentsorgung", "/kleinmengen-entsorgung"],
    aliases: [
      {
        language: "en",
        label: "Englische Suchbegriffe",
        terms: ["decluttering Regensburg", "apartment clearance Regensburg", "estate clearance Bavaria", "junk removal Regensburg", "business disposal Regensburg"],
      },
      {
        language: "ru",
        label: "Russische Suchbegriffe",
        terms: ["расхламление Регенсбург", "вывоз мебели Регенсбург", "освобождение квартиры Бавария", "утилизация вещей Регенсбург"],
      },
      {
        language: "zh",
        label: "Chinesische Suchbegriffe",
        terms: ["雷根斯堡清理", "雷根斯堡家具处理", "巴伐利亚房屋清空", "雷根斯堡废弃物处理"],
      },
      {
        language: "ko",
        label: "Koreanische Suchbegriffe",
        terms: ["레겐스부르크 정리", "레겐스부르크 가구 폐기", "바이에른 집 비우기", "레겐스부르크 폐기물 처리"],
      },
    ],
  },
  {
    id: "handover-object-regensburg-bayern",
    market: "regensburg-bayern",
    serviceScope: ["Schlüsselübergabe", "Übergabeprotokoll", "Mieterwechsel", "Objektservice", "Immobilie verkaufsbereit machen"],
    canonicalPages: ["/schluesseluebergabe", "/uebergabeakte", "/mieterwechsel-service-regensburg", "/makler-vermieter-link", "/immobilie-verkaufsbereit-machen"],
    aliases: [
      {
        language: "en",
        label: "Englische Suchbegriffe",
        terms: ["key handover service Regensburg", "apartment handover Regensburg", "tenant turnover service Bavaria", "property ready service Regensburg"],
      },
      {
        language: "ru",
        label: "Russische Suchbegriffe",
        terms: ["передача ключей Регенсбург", "акт передачи квартиры Регенсбург", "подготовка квартиры Бавария"],
      },
      {
        language: "zh",
        label: "Chinesische Suchbegriffe",
        terms: ["雷根斯堡钥匙交接", "雷根斯堡公寓交接", "巴伐利亚房屋交接准备"],
      },
      {
        language: "ko",
        label: "Koreanische Suchbegriffe",
        terms: ["레겐스부르크 열쇠 인계", "레겐스부르크 주택 인계", "바이에른 임대 교체 서비스"],
      },
    ],
  },
  {
    id: "offer-check-plan-b-regensburg-bayern",
    market: "regensburg-bayern",
    serviceScope: ["Angebotscheck", "Angebot anderer Firma prüfen", "Plan-B-Service", "Schadensbegrenzung", "Plattform-Auftrag prüfen"],
    canonicalPages: ["/angebot-guenstiger-pruefen", "/angebot-vergleichen-regensburg", "/angebotscheck", "/plattform-auftrag-pruefen", "/plan-b-service", "/schadensbegrenzung"],
    aliases: [
      {
        language: "en",
        label: "Englische Suchbegriffe",
        terms: ["check moving quote Regensburg", "check cleaning offer Bavaria", "cheaper moving quote Regensburg", "backup service moving cleaning Bavaria"],
      },
      {
        language: "ru",
        label: "Russische Suchbegriffe",
        terms: ["проверить предложение переезда Регенсбург", "проверить цену уборки Бавария", "план Б переезд уборка Регенсбург"],
      },
      {
        language: "zh",
        label: "Chinesische Suchbegriffe",
        terms: ["雷根斯堡搬家报价检查", "巴伐利亚清洁报价检查", "雷根斯堡备用服务"],
      },
      {
        language: "ko",
        label: "Koreanische Suchbegriffe",
        terms: ["레겐스부르크 이사 견적 확인", "바이에른 청소 견적 확인", "레겐스부르크 백업 서비스"],
      },
    ],
  },
  {
    id: "regensburg-cleaning-only",
    market: "regensburg-cleaning",
    serviceScope: ["Reinigung Regensburg", "Reinigungsfirma Regensburg", "Putzfirma Regensburg", "Wohnungsreinigung Regensburg", "Treppenhausreinigung Regensburg", "Reinigung Hauseingang Regensburg", "Hausflurreinigung Regensburg", "Gewerbeflächen-Reinigung Regensburg", "Gebäudereinigung Regensburg Stadtamhof", "Putzservice Regensburg", "Reinigung Kosten Regensburg", "Reinigung Angebot Regensburg", "Reinigung Regensburg Stadtteile", "Reinigung Regensburg", "Reinigung Regensburg", "Reinigung Regensburg", "Reinigung Regensburg", "Reinigung Regensburg", "Angebot prüfen Regensburg", "Firmenreinigung Regensburg", "Büroreinigung Regensburg", "Unterhaltsreinigung Regensburg", "Gebäudereinigung Regensburg", "Objektreinigung Regensburg", "Reinigungskraft Büro Regensburg", "Ladenreinigung Regensburg", "Geschäftsreinigung Regensburg", "Shop Reinigung Regensburg", "Reinigung Verkaufsfläche Regensburg", "Sonderreinigung Regensburg", "Intensivreinigung Regensburg", "starke Verschmutzung reinigen Regensburg", "Reinigung nach Leerstand Regensburg", "Reinigung nach Mieterwechsel Regensburg", "Hotelreinigung Regensburg", "Hotel Reinigung Regensburg", "Boardinghouse Reinigung Regensburg", "Baureinigung Regensburg", "Bauendreinigung Regensburg", "Reinigung nach Renovierung Regensburg", "Teppichreinigung Regensburg", "Teppichbodenreinigung Regensburg", "Polsterreinigung Regensburg", "Grundreinigung Regensburg", "möblierte Wohnung Reinigung Regensburg"],
    canonicalPages: ["/regensburg/reinigung", "/regensburg/reinigungsfirma", "/regensburg/reinigungsfirma", "/regensburg/reinigung", "/treppenhausreinigung-regensburg", "/regensburg/reinigung", "/regensburg/reinigung", "/angebot-vergleichen-regensburg", "/regensburg/reinigung", "/angebot-vergleichen-regensburg", "/regensburg/bueroreinigung", "/unterhaltsreinigung-regensburg", "/regensburg/reinigung", "/regensburg/reinigung", "/hotelreinigung-regensburg", "/baureinigung-regensburg", "/teppichreinigung-regensburg", "/grundreinigung-regensburg", "/regensburg/reinigung"],
    excludedIntents: ["moving Regensburg", "relocation Regensburg", "Umzug Regensburg", "Transport Regensburg", "Büroumzug Regensburg"],
    aliases: [
      {
        language: "en",
        label: "Englische Suchbegriffe",
        terms: ["cleaning service Regensburg", "cleaning company Regensburg", "cleaners Regensburg", "office cleaning Regensburg", "regular office cleaning Regensburg", "building cleaning Regensburg", "maintenance cleaning Regensburg", "shop cleaning Regensburg", "retail cleaning Regensburg", "store cleaning Regensburg", "showroom cleaning Regensburg", "special cleaning Regensburg", "intensive cleaning Regensburg", "deep cleaning Regensburg", "vacant property cleaning Regensburg", "hotel cleaning Regensburg", "boardinghouse cleaning Regensburg", "apartment cleaning Regensburg", "staircase cleaning Regensburg", "post renovation cleaning Regensburg", "construction cleaning Regensburg", "carpet cleaning Regensburg", "upholstery cleaning Regensburg", "cleaning quote Regensburg", "cleaning costs Regensburg"],
      },
      {
        language: "ru",
        label: "Russische Suchbegriffe",
        terms: ["уборка Дюссельдорф", "клининговая компания Дюссельдорф", "клининг Дюссельдорф", "офисная уборка Дюссельдорф", "уборка отеля Дюссельдорф", "генеральная уборка Дюссельдорф", "уборка квартиры Дюссельдорф", "стоимость уборки Дюссельдорф", "предложение на уборку Дюссельдорф"],
      },
      {
        language: "zh",
        label: "Chinesische Suchbegriffe",
        terms: ["杜塞尔多夫清洁", "杜塞尔多夫清洁公司", "杜塞尔多夫清洁服务", "杜塞尔多夫办公室清洁", "杜塞尔多夫酒店清洁", "杜塞尔多夫公寓清洁", "杜塞尔多夫深度清洁", "杜塞尔多夫清洁报价", "杜塞尔多夫清洁费用"],
      },
      {
        language: "ko",
        label: "Koreanische Suchbegriffe",
        terms: ["뒤셀도르프 청소", "뒤셀도르프 청소 업체", "뒤셀도르프 청소 서비스", "뒤셀도르프 사무실 청소", "뒤셀도르프 호텔 청소", "뒤셀도르프 아파트 청소", "뒤셀도르프 대청소", "뒤셀도르프 청소 견적", "뒤셀도르프 청소 비용"],
      },
    ],
  },
];

multilingualSearchIntentGroups.push({
  id: "cleaning-regensburg-carpet-upholstery",
  market: "regensburg-bayern",
  serviceScope: [
    "Teppichreinigung Regensburg",
    "Teppichbodenreinigung Regensburg",
    "Polsterreinigung Regensburg",
    "Sofa reinigen lassen Regensburg",
    "Bürostühle reinigen Regensburg",
    "Teppichreinigung Kosten Regensburg",
  ],
  canonicalPages: ["/teppichreinigung-regensburg", "/grundreinigung-regensburg", "/regensburg/bueroreinigung", "/hotelreinigung-regensburg", "/praxisreinigung-regensburg", "/angebot-guenstiger-pruefen"],
  aliases: [
    {
      language: "en",
      label: "Englische Suchbegriffe",
      terms: ["carpet cleaning Regensburg", "office carpet cleaning Regensburg", "upholstery cleaning Regensburg", "sofa cleaning Regensburg", "office chair cleaning Regensburg", "carpet cleaning cost Regensburg"],
    },
    {
      language: "ru",
      label: "Russische Suchbegriffe",
      terms: ["чистка ковров Регенсбург", "чистка дивана Регенсбург", "чистка мягкой мебели Регенсбург"],
    },
    {
      language: "zh",
      label: "Chinesische Suchbegriffe",
      terms: ["雷根斯堡地毯清洁", "雷根斯堡沙发清洁", "雷根斯堡软垫清洁"],
    },
    {
      language: "ko",
      label: "Koreanische Suchbegriffe",
      terms: ["레겐스부르크 카펫 청소", "레겐스부르크 소파 청소", "레겐스부르크 의자 청소"],
    },
  ],
});

multilingualSearchIntentGroups.push({
  id: "cleaning-regensburg-construction",
  market: "regensburg-bayern",
  serviceScope: [
    "Baureinigung Regensburg",
    "Bauendreinigung Regensburg",
    "Baufeinreinigung Regensburg",
    "Reinigung nach Renovierung Regensburg",
    "Handwerkerstaub entfernen Regensburg",
    "Wohnung nach Sanierung reinigen Regensburg",
    "Baustaub Reinigung Regensburg",
  ],
  canonicalPages: ["/baureinigung-regensburg", "/grundreinigung-regensburg", "/fensterreinigung-regensburg", "/regensburg/gewerbereinigung", "/regensburg/endreinigung", "/angebot-guenstiger-pruefen"],
  aliases: [
    {
      language: "en",
      label: "Englische Suchbegriffe",
      terms: ["post construction cleaning Regensburg", "construction cleaning Regensburg", "builders clean Regensburg", "renovation cleaning Regensburg", "construction final cleaning Regensburg", "remove construction dust Regensburg"],
    },
    {
      language: "ru",
      label: "Russische Suchbegriffe",
      terms: ["уборка после ремонта Регенсбург", "строительная уборка Регенсбург", "убрать строительную пыль Регенсбург"],
    },
    {
      language: "zh",
      label: "Chinesische Suchbegriffe",
      terms: ["雷根斯堡装修后清洁", "雷根斯堡施工后清洁", "雷根斯堡清理建筑灰尘"],
    },
    {
      language: "ko",
      label: "Koreanische Suchbegriffe",
      terms: ["레겐스부르크 공사 후 청소", "레겐스부르크 리모델링 후 청소", "레겐스부르크 건설 먼지 청소"],
    },
  ],
});

multilingualSearchIntentGroups.push({
  id: "cleaning-regensburg-window",
  market: "regensburg-bayern",
  serviceScope: [
    "Fensterreinigung Regensburg",
    "Glasreinigung Regensburg",
    "Fenster putzen lassen Regensburg",
    "Schaufensterreinigung Regensburg",
    "Glasreinigung Regensburg Buero",
    "Fensterreinigung Kosten Regensburg",
    "Fensterreinigung vor Uebergabe Regensburg",
    "Rahmen reinigen Regensburg",
  ],
  canonicalPages: ["/fensterreinigung-regensburg", "/regensburg/gewerbereinigung", "/regensburg/bueroreinigung", "/grundreinigung-regensburg", "/angebot-guenstiger-pruefen"],
  aliases: [
    {
      language: "en",
      label: "Englische Suchbegriffe",
      terms: ["window cleaning Regensburg", "glass cleaning Regensburg", "office window cleaning Regensburg", "storefront window cleaning Regensburg", "window cleaning cost Regensburg", "move out window cleaning Regensburg"],
    },
    {
      language: "ru",
      label: "Russische Suchbegriffe",
      terms: ["мойка окон Регенсбург", "чистка стекла Регенсбург", "мойка витрин Регенсбург"],
    },
    {
      language: "zh",
      label: "Chinesische Suchbegriffe",
      terms: ["雷根斯堡窗户清洁", "雷根斯堡玻璃清洁", "雷根斯堡橱窗清洁"],
    },
    {
      language: "ko",
      label: "Koreanische Suchbegriffe",
      terms: ["레겐스부르크 창문 청소", "레겐스부르크 유리 청소", "레겐스부르크 상점 유리 청소"],
    },
  ],
});

multilingualSearchIntentGroups.push({
  id: "regensburg-cleaning-b2b-dominance",
  market: "regensburg-cleaning",
  serviceScope: [
    "Reinigungsfirma Regensburg",
    "Büroreinigung Regensburg",
    "Firmenreinigung Regensburg",
    "Firmenreinigung Regensburg",
    "Gewerbereinigung Regensburg",
    "Unterhaltsreinigung Regensburg",
    "Gebäudereinigung Regensburg",
    "Objektreinigung Regensburg",
    "Reinigungsplan Büro Regensburg",
    "Ladenreinigung Regensburg",
    "Geschäftsreinigung Regensburg",
    "Shop Reinigung Regensburg",
    "Reinigung Verkaufsfläche Regensburg",
    "Sonderreinigung Regensburg",
    "Intensivreinigung Regensburg",
    "starke Verschmutzung reinigen Regensburg",
    "Reinigung nach Leerstand Regensburg",
    "Reinigung nach Mieterwechsel Regensburg",
    "Baureinigung Regensburg",
    "Bauendreinigung Regensburg",
    "Reinigung nach Renovierung Regensburg",
    "Teppichreinigung Regensburg",
    "Teppichbodenreinigung Regensburg",
    "Polsterreinigung Regensburg",
    "Hotelreinigung Regensburg",
    "Kanzleireinigung Regensburg",
    "Praxisreinigung Regensburg",
    "Kellerreinigung Regensburg",
    "Entsorgung Regensburg",
    "Endreinigung Regensburg",
    "Reinigung Altstadt Regensburg",
    "Reinigung Innenstadt Regensburg",
    "Reinigung Stadtamhof Regensburg",
    "Reinigung Galgenberg Regensburg",
    "Reinigung Westenviertel Regensburg",
    "Reinigung MedienOsthafen Regensburg",
    "Reinigung Regensburg",
    "Reinigung Regensburg",
    "Reinigung Regensburg",
    "Reinigung Regensburg",
    "Reinigung Regensburg",
  ],
  canonicalPages: [
    "/regensburg/reinigung",
    "/regensburg/reinigungsfirma",
    "/regensburg/reinigungsfirma",
    "/regensburg/reinigung",
    "/treppenhausreinigung-regensburg",
    "/regensburg/reinigung",
    "/regensburg/reinigung",
    "/angebot-vergleichen-regensburg",
    "/regensburg/reinigung",
    "/angebot-vergleichen-regensburg",
    "/regensburg/bueroreinigung",
    "/unterhaltsreinigung-regensburg",
    "/regensburg/reinigung",
    "/regensburg/reinigung",
    "/regensburg/bueroreinigung",
    "/regensburg/gewerbereinigung",
    "/regensburg/gewerbereinigung",
    "/hotelreinigung-regensburg",
    "/regensburg/kanzleireinigung",
    "/praxisreinigung-regensburg",
    "/regensburg/reinigung",
    "/fensterreinigung-regensburg",
    "/baureinigung-regensburg",
    "/teppichreinigung-regensburg",
    "/regensburg/reinigung",
    "/regensburg/entsorgung",
    "/grundreinigung-regensburg",
    "/treppenhausreinigung-regensburg",
    "/regensburg/endreinigung",
    "/regensburg/reinigung",
    "/regensburg/reinigung",
  ],
  excludedIntents: [
    "Umzug Regensburg",
    "Transport Regensburg",
    "Büroumzug Regensburg",
    "moving Regensburg",
    "relocation Regensburg",
  ],
  aliases: [
    {
      language: "en",
      label: "Englische Suchbegriffe",
      terms: [
        "cleaning company Regensburg",
        "commercial cleaning Regensburg",
        "office cleaning Regensburg",
        "shop cleaning Regensburg",
        "retail cleaning Regensburg",
        "store cleaning Regensburg",
        "special cleaning Regensburg",
        "intensive cleaning Regensburg",
        "hotel cleaning Regensburg",
        "law office cleaning Regensburg",
        "practice cleaning Regensburg",
        "post renovation cleaning Regensburg",
        "construction cleaning Regensburg",
        "cleaning Regensburg Regensburg Regensburg",
      ],
    },
    {
      language: "ru",
      label: "Russische Suchbegriffe",
      terms: [
        "коммерческая уборка Дюссельдорф",
        "офисная уборка Дюссельдорф",
        "уборка отеля Дюссельдорф",
        "уборка адвокатского офиса Дюссельдорф",
        "уборка практики Дюссельдорф",
        "клининг для компании Дюссельдорф",
      ],
    },
    {
      language: "zh",
      label: "Chinesische Suchbegriffe",
      terms: [
        "杜塞尔多夫商业清洁",
        "杜塞尔多夫办公室清洁",
        "杜塞尔多夫酒店清洁",
        "杜塞尔多夫律所清洁",
        "杜塞尔多夫诊所清洁",
        "杜塞尔多夫公司清洁",
      ],
    },
    {
      language: "ko",
      label: "Koreanische Suchbegriffe",
      terms: [
        "뒤셀도르프 상업 청소",
        "뒤셀도르프 사무실 청소",
        "뒤셀도르프 호텔 청소",
        "뒤셀도르프 법률사무소 청소",
        "뒤셀도르프 병원 청소",
        "뒤셀도르프 회사 청소",
      ],
    },
  ],
});

export function getSchemaKnowAboutAliases(limit = 60) {
  return multilingualSearchIntentGroups
    .flatMap((group) => group.aliases.flatMap((alias) => alias.terms))
    .slice(0, limit);
}

export function getRegensburgCleaningInternationalAliases() {
  const aliasesByLanguage = new Map<SearchIntentAliasLanguage, {
    language: SearchIntentAliasLanguage;
    label: string;
    terms: string[];
  }>();

  multilingualSearchIntentGroups
    .filter((group) => group.market === "regensburg-cleaning")
    .forEach((group) => {
      group.aliases.forEach((alias) => {
        const current = aliasesByLanguage.get(alias.language) || {
          language: alias.language,
          label: alias.label,
          terms: [],
        };
        current.terms = Array.from(new Set([...current.terms, ...alias.terms]));
        aliasesByLanguage.set(alias.language, current);
      });
    });

  return Array.from(aliasesByLanguage.values()).map((alias) => ({
    ...alias,
    terms: alias.terms.slice(0, 12),
  }));
}

export function getRegensburgCleaningInternationalTerms(limit = 48) {
  return getRegensburgCleaningInternationalAliases()
    .flatMap((alias) => alias.terms)
    .slice(0, limit);
}

export function getLlmsSearchIntentLines() {
  return multilingualSearchIntentGroups
    .map((group) => {
      const pages = group.canonicalPages.join(", ");
      const aliases = group.aliases
        .map((alias) => `${alias.label}: ${alias.terms.join("; ")}`)
        .join(" | ");
      const exclusions = group.excludedIntents?.length
        ? ` Ausgeschlossen: ${group.excludedIntents.join(", ")}.`
        : "";

      return `- ${group.id}: Markt ${group.market}; Leistungen: ${group.serviceScope.join(", ")}; passende Seiten: ${pages}. ${aliases}.${exclusions}`;
    })
    .join("\n");
}

export function getRouteMultilingualIntentSummary(path: string, fallbackGeo = "Regensburg") {
  const route = path || "/";
  const matchingGroups = multilingualSearchIntentGroups.filter((group) =>
    group.canonicalPages.some((page) => route === page || route.startsWith(`${page}/`)),
  );
  const groups = matchingGroups.length
    ? matchingGroups
    : route.includes("regensburg")
      ? multilingualSearchIntentGroups.filter((group) => group.market === "regensburg-cleaning")
      : multilingualSearchIntentGroups.filter((group) => group.market === "regensburg-bayern").slice(0, 3);

  return groups
    .map((group) => {
      const sampleTerms = group.aliases
        .map((alias) => alias.terms[0])
        .filter(Boolean)
        .join(" / ");
      return `${group.serviceScope.slice(0, 3).join(", ")} für ${group.market === "regensburg-cleaning" ? "Reinigung Regensburg" : fallbackGeo}: ${sampleTerms}`;
    })
    .join(" | ");
}
