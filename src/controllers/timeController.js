import { createErrorResponse, createResponse } from "../utils/apiHelpers.js";

// Timezone data for countries
const countryTimezones = {
  US: "America/New_York",
  IN: "Asia/Kolkata",
  GB: "Europe/London",
  DE: "Europe/Berlin",
  FR: "Europe/Paris",
  JP: "Asia/Tokyo",
  AU: "Australia/Sydney",
  CA: "America/Toronto",
  BR: "America/Sao_Paulo",
  ZA: "Africa/Johannesburg",
};

export const getCountryTime = (req, res) => {
  try {
    const { country } = req.params;
    const { tz } = req.query;

    // Use provided timezone or get from country mapping
    let timezone = tz;
    if (!timezone && country) {
      timezone = countryTimezones[country.toUpperCase()];
    }

    if (!timezone) {
      return res
        .status(400)
        .json(
          createErrorResponse(
            "Timezone is required. Provide either a valid country code or tz parameter.",
            400
          )
        );
    }

    // Create date in the specified timezone
    const now = new Date();
    const timeString = now.toLocaleString("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      weekday: "long",
    });

    // Get timezone offset
    const offset = now
      .toLocaleString("en-US", {
        timeZone: timezone,
        timeZoneName: "short",
      })
      .split(", ")[1];

    res.json(
      createResponse({
        country: country ? country.toUpperCase() : null,
        timezone: timezone,
        time: timeString,
        offset: offset,
        utc: now.toISOString(),
        timestamp: Math.floor(now.getTime() / 1000),
      })
    );
  } catch (error) {
    console.error("Error in getCountryTime:", error);
    if (error.message.includes("Invalid time zone")) {
      return res
        .status(400)
        .json(createErrorResponse("Invalid timezone provided", 400));
    }
    res.status(500).json(createErrorResponse("Failed to get country time"));
  }
};
