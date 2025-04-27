var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/email.ts
var email_exports = {};
__export(email_exports, {
  formatAppointmentEmail: () => formatAppointmentEmail,
  sendEmail: () => sendEmail
});
import { MailService } from "@sendgrid/mail";
async function sendEmail(params) {
  if (!mailService) {
    return {
      success: false,
      message: "SendGrid API key not configured. Cannot send email."
    };
  }
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || "",
      html: params.html || ""
    });
    return {
      success: true,
      message: "Email sent successfully"
    };
  } catch (error) {
    console.error("SendGrid email error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error sending email"
    };
  }
}
function formatAppointmentEmail(data) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; padding: 10px; background: #8A2BE2; color: white; border-radius: 5px 5px 0 0;">
        <h2 style="margin: 0;">New Appointment Request</h2>
      </div>
      
      <div style="padding: 20px;">
        <p><strong>Client Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Service Type:</strong> ${data.serviceType}</p>
        <p><strong>Preferred Date:</strong> ${data.preferredDate}</p>
        <p><strong>Preferred Time:</strong> ${data.preferredTime}</p>
        
        ${data.message ? `<p><strong>Additional Information:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>` : ""}
        
        ${data.utm_source ? `<p><strong>Source:</strong> ${data.utm_source}</p>` : ""}
      </div>
      
      <div style="background: #f5f5f5; padding: 15px; text-align: center; border-radius: 0 0 5px 5px;">
        <p style="margin: 0; color: #666;">This message was sent from your Posh IV Hydration Services website contact form.</p>
      </div>
    </div>
  `;
}
var mailService;
var init_email = __esm({
  "server/email.ts"() {
    "use strict";
    mailService = null;
    if (process.env.SENDGRID_API_KEY) {
      mailService = new MailService();
      mailService.setApiKey(process.env.SENDGRID_API_KEY);
      console.log("SendGrid email service initialized");
    } else {
      console.warn("SENDGRID_API_KEY not found. Email functionality will be disabled.");
    }
  }
});

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import axios from "axios";
async function registerRoutes(app2) {
  app2.get("/api/email-config", (_req, res) => {
    res.json({
      serviceId: process.env.EMAILJS_SERVICE_ID || "",
      templateId: process.env.EMAILJS_TEMPLATE_ID || "",
      publicKey: process.env.EMAILJS_PUBLIC_KEY || ""
    });
  });
  app2.get("/api/reviews", async (req, res) => {
    try {
      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      if (!apiKey) {
        return res.status(503).json({
          error: "API key not configured",
          message: "Google Places API key is not available"
        });
      }
      const placeId = process.env.GOOGLE_PLACE_ID || "placeholder_place_id";
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${apiKey}`;
      const response = await axios.get(url);
      if (response.data.status === "OK") {
        const { rating, reviews } = response.data.result;
        return res.json({
          rating,
          reviews: reviews.map((review) => ({
            author_name: review.author_name,
            rating: review.rating,
            text: review.text,
            time: review.time
          }))
        });
      } else {
        throw new Error(`Google API error: ${response.data.status}`);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return res.status(500).json({
        error: "Failed to fetch reviews",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, serviceType, preferredDate, preferredTime, message, utm_source } = req.body;
      console.log("Contact form submission:", {
        name,
        email,
        phone,
        serviceType,
        preferredDate,
        preferredTime,
        message,
        utm_source
      });
      const { sendEmail: sendEmail2, formatAppointmentEmail: formatAppointmentEmail2 } = await Promise.resolve().then(() => (init_email(), email_exports));
      const emailResult = await sendEmail2({
        to: "support@poshhydration.com",
        // Replace with business email when in production
        from: "appointments@poshhydration.com",
        // Must be verified in SendGrid
        subject: `New Appointment Request from ${name}`,
        html: formatAppointmentEmail2({
          name,
          email,
          phone,
          serviceType,
          preferredDate,
          preferredTime,
          message,
          utm_source
        })
      });
      if (!emailResult.success) {
        console.warn("Email sending failed:", emailResult.message);
      }
      return res.status(200).json({ success: true, message: "Form submitted successfully" });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({
        error: "Failed to process form",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  base: "/",
  // <-- add this line
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: []
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
