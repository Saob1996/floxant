export type SearchIntentAliasLanguage = "en" | "ru" | "zh" | "ko";

export type SearchIntentAliasGroup = {
  id: string;
  market: "regensburg-bayern" | "duesseldorf-cleaning";
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
    canonicalPages: ["/umzug-regensburg", "/umzug-bayern", "/bueroumzug", "/kleintransport-regensburg", "/leerfahrt-rueckfahrt", "/beiladung"],
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
    id: "cleaning-regensburg-bayern",
    market: "regensburg-bayern",
    serviceScope: ["Reinigung", "Endreinigung", "Gewerbereinigung", "Büroreinigung", "Übergabereinigung"],
    canonicalPages: ["/reinigung-regensburg", "/reinigung-bayern", "/gewerbereinigung-regensburg", "/umzug-mit-reinigung", "/wohnung-wieder-vermietbar"],
    aliases: [
      {
        language: "en",
        label: "Englische Suchbegriffe",
        terms: ["cleaning service Regensburg", "cleaning company Regensburg", "office cleaning Regensburg", "end cleaning Bavaria", "apartment handover cleaning Regensburg"],
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
    canonicalPages: ["/entruempelung-regensburg", "/entruempelung-bayern", "/wohnungsaufloesung-regensburg", "/nachlass-raeumung-regensburg", "/firmenentsorgung", "/kleinmengen-entsorgung"],
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
    canonicalPages: ["/angebot-guenstiger-pruefen", "/angebotscheck", "/plattform-auftrag-pruefen", "/plan-b-service", "/schadensbegrenzung"],
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
    id: "duesseldorf-cleaning-only",
    market: "duesseldorf-cleaning",
    serviceScope: ["Reinigung Düsseldorf", "B2B-Reinigung Düsseldorf", "Büroreinigung Düsseldorf", "Grundreinigung Düsseldorf", "Treppenhausreinigung Düsseldorf", "möblierte Wohnung Reinigung Düsseldorf"],
    canonicalPages: ["/duesseldorf/reinigung", "/duesseldorf/bueroreinigung", "/duesseldorf/grundreinigung", "/duesseldorf/treppenhausreinigung", "/reinigung-moeblierte-wohnung-duesseldorf"],
    excludedIntents: ["moving Düsseldorf", "relocation Düsseldorf", "Umzug Düsseldorf", "Transport Düsseldorf", "Büroumzug Düsseldorf"],
    aliases: [
      {
        language: "en",
        label: "Englische Suchbegriffe",
        terms: ["cleaning service Düsseldorf", "office cleaning Düsseldorf", "apartment cleaning Düsseldorf", "deep cleaning Düsseldorf", "staircase cleaning Düsseldorf"],
      },
      {
        language: "ru",
        label: "Russische Suchbegriffe",
        terms: ["уборка Дюссельдорф", "офисная уборка Дюссельдорф", "генеральная уборка Дюссельдорф", "уборка квартиры Дюссельдорф"],
      },
      {
        language: "zh",
        label: "Chinesische Suchbegriffe",
        terms: ["杜塞尔多夫清洁", "杜塞尔多夫办公室清洁", "杜塞尔多夫公寓清洁", "杜塞尔多夫深度清洁"],
      },
      {
        language: "ko",
        label: "Koreanische Suchbegriffe",
        terms: ["뒤셀도르프 청소", "뒤셀도르프 사무실 청소", "뒤셀도르프 아파트 청소", "뒤셀도르프 대청소"],
      },
    ],
  },
];

export function getSchemaKnowAboutAliases(limit = 60) {
  return multilingualSearchIntentGroups
    .flatMap((group) => group.aliases.flatMap((alias) => alias.terms))
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
    : route.includes("duesseldorf")
      ? multilingualSearchIntentGroups.filter((group) => group.market === "duesseldorf-cleaning")
      : multilingualSearchIntentGroups.filter((group) => group.market === "regensburg-bayern").slice(0, 3);

  return groups
    .map((group) => {
      const sampleTerms = group.aliases
        .map((alias) => alias.terms[0])
        .filter(Boolean)
        .join(" / ");
      return `${group.serviceScope.slice(0, 3).join(", ")} für ${group.market === "duesseldorf-cleaning" ? "Düsseldorf Reinigung" : fallbackGeo}: ${sampleTerms}`;
    })
    .join(" | ");
}
