import { useEffect, useRef } from "react";
import * as powerbi from "powerbi-client";

export default function PowerBIEmbed() {
  const reportRef = useRef(null);

  useEffect(() => {
    const models = window["powerbi-client"].models;

    const embedConfig = {
      type: "report",
      id: "9596aa2b-2f87-4cc1-bd3b-435940a9fb9d",
      embedUrl: "YOUR_EMBED_URL",
      accessToken: "YOUR_ACCESS_TOKEN",
      tokenType: models.TokenType.Embed,

      settings: {
        panes: {
          filters: { visible: false },
          pageNavigation: { visible: false }
        },
        navContentPaneEnabled: false,
        background: models.BackgroundType.Transparent
      }
    };

    const powerbiService = new powerbi.service.Service(
      powerbi.factories.hpmFactory,
      powerbi.factories.wpmpFactory,
      powerbi.factories.routerFactory
    );

    powerbiService.embed(reportRef.current, embedConfig);
  }, []);

  return (
    <div
      ref={reportRef}
      className="w-full h-[calc(100vh-90px)] rounded-xl overflow-hidden"
    ></div>
  );
}