import path from "node:path";
import {config} from "dotenv";
import type { NextConfig } from "next";

config({ path: path.resolve(import.meta.dirname, "../../.env") });

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;


[
  {
    "load_balancer_experimental_routing": null,
    "load_balancer_geo_aware_info": [],
    "load_balancer_redirect_identifier": null,
    "logflare_worker": [
      {
        "worker_id": "C5F6DE"
      }
    ],
    "request": [
      {
        "cf": [
          {
            "asOrganization": "--------------------------------",
            "asn": null,
            "botManagement": [
              {
                "corporateProxy": null,
                "detectionIds": [],
                "ja3Hash": "d67b094811e5145139d7cea5f014309f",
                "ja4": "t13d5212h1_b262b3658495_8e6e362c5eac",
                "ja4Signals": [],
                "jsDetection": [],
                "score": null,
                "staticResource": null,
                "verifiedBot": null
              }
            ],
            "city": "--------------------------------",
            "clientAcceptEncoding": null,
            "clientTcpRtt": null,
            "clientTrustScore": 1,
            "colo": "SIN",
            "continent": null,
            "country": "PK",
            "edgeRequestKeepAliveStatus": null,
            "httpProtocol": "HTTP/1.1",
            "isEUCountry": null,
            "latitude": null,
            "longitude": null,
            "metroCode": null,
            "postalCode": "54000",
            "region": "Punjab",
            "regionCode": null,
            "requestPriority": null,
            "timezone": "Asia/Karachi",
            "tlsCipher": null,
            "tlsClientAuth": [],
            "tlsClientCiphersSha1": null,
            "tlsClientExtensionsSha1": null,
            "tlsClientExtensionsSha1Le": null,
            "tlsClientHelloLength": null,
            "tlsClientRandom": null,
            "tlsExportedAuthenticator": [],
            "tlsVersion": null,
            "verifiedBotCategory": null
          }
        ],
        "headers": [
          {
            "accept": "*/*",
            "cf_cache_status": null,
            "cf_connecting_ip": "103.151.43.71",
            "cf_ipcountry": "PK",
            "cf_ray": "9e9948654f7a5888",
            "content_length": "181",
            "content_location": null,
            "content_range": null,
            "content_type": "application/json;charset=UTF-8",
            "date": null,
            "host": "jeejggpuxvhsstfpopbl.supabase.co",
            "prefer": null,
            "range": null,
            "referer": null,
            "sb_gateway_mode": null,
            "sb_gateway_version": null,
            "user_agent": "node",
            "x_client_info": "supabase-ssr/0.10.2 createServerClient",
            "x_forwarded_for": null,
            "x_forwarded_host": null,
            "x_forwarded_proto": "https",
            "x_forwarded_user_agent": null,
            "x_kong_proxy_latency": null,
            "x_kong_upstream_latency": null,
            "x_real_ip": "103.151.43.71"
          }
        ],
        "host": "jeejggpuxvhsstfpopbl.supabase.co",
        "method": "POST",
        "path": "/auth/v1/signup",
        "port": null,
        "protocol": "https:",
        "sb": [
          {
            "apikey": [
              {
                "apikey": [
                  {
                    "error": null,
                    "hash": "--------------------------------",
                    "prefix": "sb_publishable_RPanw"
                  }
                ],
                "authorization": [
                  {
                    "error": null,
                    "hash": "--------------------------------",
                    "prefix": "sb_publishable_RPanw"
                  }
                ]
              }
            ],
            "auth_user": null,
            "jwt": []
          }
        ],
        "search": null,
        "url": "https://jeejggpuxvhsstfpopbl.supabase.co/auth/v1/signup"
      }
    ],
    "response": [
      {
        "headers": [
          {
            "cf_cache_status": "DYNAMIC",
            "cf_ray": "9e994867a7555888-SIN",
            "content_length": "72",
            "content_location": null,
            "content_range": null,
            "content_type": "application/json",
            "date": "Thu, 09 Apr 2026 11:48:27 GMT",
            "proxy_status": null,
            "sb_gateway_mode": null,
            "sb_gateway_version": "1",
            "sb_request_id": null,
            "transfer_encoding": null,
            "x_kong_proxy_latency": null,
            "x_kong_upstream_latency": null,
            "x_sb_error_code": "unexpected_failure"
          }
        ],
        "origin_time": 884,
        "status_code": 500
      }
    ]
  }
]