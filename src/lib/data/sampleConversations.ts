import { Conversation } from "@/types";

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-led-bulb-01",
    title: "LED Bulb Standard & ISI Mark Requirements",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    category: "Electrical & Lighting",
    isPinned: true,
    detectedStandard: "IS 16102 (Part 1 & 2)",
    messages: [
      {
        id: "msg-user-1",
        conversationId: "conv-led-bulb-01",
        sender: "user",
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        text: "What BIS standard applies to LED bulbs?"
      },
      {
        id: "msg-ai-1",
        conversationId: "conv-led-bulb-01",
        sender: "assistant",
        timestamp: new Date(Date.now() - 3600000 * 2 + 3000).toISOString(),
        structuredContent: {
          productOrTopic: "Self-Ballasted LED Lamps for General Lighting",
          relevantStandard: "IS 16102 (Part 1 & 2)",
          standardTitle: "Self-Ballasted LED Lamps for General Lighting Services",
          applicability: "Applicable to all self-ballasted LED lamps with supply voltages up to 250V AC. Mandatory under DPIIT Quality Control Order.",
          certificationStatus: "Mandatory",
          certificationScheme: "Scheme-I (ISI Mark)",
          keyRequirements: [
            "Electrical safety & insulation resistance",
            "Performance, luminous efficacy & harmonic distortion (THD < 20%)",
            "Glow wire resistance to fire at 650°C",
            "Mandatory ISI Mark with unique CM/L license number"
          ],
          testingParameters: [
            "Interchangeability & Mechanical Strength of Lamp Caps",
            "Insulation Resistance and Electric Strength after Humidity Treatment",
            "Resistance to Heat, Fire and Tracking (Glow-wire test)",
            "Luminous Flux, Efficacy and Correlated Colour Temperature (CCT)"
          ],
          markingRequirements: [
            "Standard ISI Mark with Unique CML/L License Number",
            "Rated Voltage, Wattage, Frequency, and Lumens",
            "Country of Origin & Manufacturer Name/Brand"
          ],
          source: {
            title: "IS 16102 Official BIS Product Standard",
            isNumber: "IS 16102",
            sourceName: "Official Bureau of Indian Standards Portal",
            url: "https://www.bis.gov.in/product-certification/products-under-compulsory-certification/",
            isOfficial: true,
            verifiedAt: "2026-08-28"
          },
          confidence: "Verified Official",
          importantNotice: "Requirements can change. Verify the current requirement on the official BIS source before making a compliance decision.",
          flowchartSteps: [
            "1. Clause verification under IS 16102 Part 1 (Safety) & Part 2 (Performance)",
            "2. In-house testing laboratory installation per SIT requirements",
            "3. Online application filing on Manakonline portal",
            "4. BIS Officer on-site factory audit and sample drawing",
            "5. Grant of CM/L licence to print ISI mark on LED packaging"
          ]
        }
      }
    ]
  },
  {
    id: "conv-pressure-cooker-02",
    title: "Domestic Pressure Cooker QCO Checklist",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    category: "Consumer Appliances",
    isPinned: false,
    detectedStandard: "IS 2347",
    messages: [
      {
        id: "msg-user-2",
        conversationId: "conv-pressure-cooker-02",
        sender: "user",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        text: "Is BIS certification mandatory for pressure cookers in India?"
      },
      {
        id: "msg-ai-2",
        conversationId: "conv-pressure-cooker-02",
        sender: "assistant",
        timestamp: new Date(Date.now() - 86400000 + 2500).toISOString(),
        structuredContent: {
          productOrTopic: "Domestic Pressure Cookers",
          relevantStandard: "IS 2347",
          standardTitle: "Domestic Pressure Cookers — Specification",
          applicability: "Mandatory under the Domestic Pressure Cooker (Quality Control) Order issued by DPIIT. Manufacturing, importing, or selling without an ISI mark is strictly prohibited.",
          certificationStatus: "Mandatory",
          certificationScheme: "Scheme-I (ISI Mark)",
          keyRequirements: [
            "Hydrostatic proof pressure test (3x operating pressure)",
            "Safety valve release & fusible plug actuation test",
            "Bursting pressure verification and handle heat resistance",
            "Food-grade metal purity (SS 304 / Pure Aluminium)"
          ],
          testingParameters: [
            "Hydrostatic Pressure Test (Proof Pressure up to 3 times operating pressure)",
            "Safety Valve & Fusible Plug Operating Pressure Test",
            "Bursting Pressure Test",
            "Thermal Shock & Cooking Pressure Retention"
          ],
          markingRequirements: [
            "Mandatory ISI Mark prominently engraved on body and lid",
            "Nominal Capacity in Litres",
            "Manufacturer Name, Trade Mark, and Batch/Lot Number"
          ],
          source: {
            title: "IS 2347 Domestic Pressure Cooker QCO",
            isNumber: "IS 2347",
            sourceName: "Ministry of Commerce & Industry (DPIIT)",
            url: "https://www.services.bis.gov.in/php/BIS_2.0/bisconnect/knowyourstandards/isdetails/2347",
            isOfficial: true,
            verifiedAt: "2026-08-25"
          },
          confidence: "Verified Official",
          importantNotice: "Requirements can change. Verify the current requirement on the official BIS source before making a compliance decision."
        }
      }
    ]
  }
];
