// app/actions/track-view.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { error } from "console";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js"; // Add this package

export async function trackView(linkId: string) {
  console.log("🚀 Starting trackView for linkId:", linkId);
  const supabase = await createClient();
  const headersList = await headers();

  // Verify user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.error("User not authenticated");
    return { error: "Authentication required" };
  }

  try {
    const userAgent = headersList.get("user-agent") || "";
    const ipAddress = headersList.get("x-forwarded-for")?.split(",")[0]?.trim();
    console.log("📱 User Agent:", userAgent);
    console.log("🌐 IP Address:", ipAddress);

    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();
    const isBot = isBotUserAgent(userAgent);
    const deviceType = getDeviceType(uaResult);
    const country = await getCountryFromIp(ipAddress);

    console.log("🤖 Is Bot:", isBot);
    console.log("📱 Device Type:", deviceType);
    console.log("🌍 Country:", country);

    const { error: viewError } = await supabase.from("cv_link_views").insert({
      link_id: linkId,
      viewer_ip: ipAddress,
      viewer_user_agent: userAgent,
      referrer: headersList.get("referer"),
      viewed_at: new Date().toISOString(),
      country,
      device_type: deviceType,
      is_bot: isBot,
    });

    if (viewError) {
      console.error("❌ View tracking failed:", viewError);
      return { error: viewError.message };
    }

    // 4. Only increment count for real users
    // if (!isBot) {
    //   const { error: incrementError } = await supabase.rpc(
    //     "increment_view_count",
    //     {
    //       link_id: linkId,
    //     }
    //   );

    //   if (incrementError) {
    //     console.error("View count increment failed:", incrementError);
    //     return { error: incrementError.message };
    //   }
    // }

    console.log("✅ View tracked successfully");
    return { success: true };
  } catch (error) {
    console.error("🔥 Tracking error:", error);
    return { error: "Failed to track view" };
  }
}

// Helper functions
function isBotUserAgent(userAgent: string): boolean {
  const bots = [
    "bot",
    "spider",
    "crawl",
    "googlebot",
    "bingbot",
    "slurp",
    "duckduckbot",
    "baiduspider",
    "yandexbot",
    "facebot",
    "ia_archiver",
  ];
  return bots.some((bot) => userAgent.toLowerCase().includes(bot));
}

function getDeviceType(uaResult: UAParser.IResult): string {
  if (uaResult.device.type) return uaResult.device.type;
  if (uaResult.os.name?.toLowerCase().includes("android")) return "mobile";
  if (uaResult.os.name?.toLowerCase().includes("ios")) return "mobile";
  return "desktop";
}

// Simplified country detection - consider using a proper geoIP service
async function getCountryFromIp(
  ip: string | undefined
): Promise<string | null> {
  if (!ip || ip === "::1" || ip.startsWith("192.168.")) return null;

  try {
    // Free tier IP geolocation (replace with your preferred service)
    const response = await fetch(`https://ipapi.co/${ip}/country/`);
    if (response.ok) {
      return await response.text();
    }
    return null;
  } catch (error) {
    console.error("Ip error:", error);
    return null;
  }
}
