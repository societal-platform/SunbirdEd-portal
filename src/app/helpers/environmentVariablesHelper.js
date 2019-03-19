// 'use strict'
// const env = process.env
// const fs = require('fs')
// const packageObj = JSON.parse(fs.readFileSync('package.json', 'utf8'))
// let envVariables = {
//   LEARNER_URL: env.sunbird_learner_player_url || 'https://sunbird-intl.stackroute.com/api/',
//   CONTENT_URL: env.sunbird_content_player_url || 'https://sunbird-intl.stackroute.com/api/',
//   CONFIG_URL: env.sunbird_config_service_url || 'https://sunbird-intl.stackroute.com/api/config/',
//   CONFIG_REFRESH_INTERVAL: env.config_refresh_interval || 10,
//   CONFIG_SERVICE_ENABLED: env.config_service_enabled || false,
//   CONTENT_PROXY_URL: env.sunbird_content_proxy_url || 'https://sunbird-intl.stackroute.com/',
//   PORTAL_REALM: env.sunbird_portal_realm || 'sunbird',
//   PORTAL_AUTH_SERVER_URL: env.sunbird_portal_auth_server_url || 'https://sunbird-intl.stackroute.com/auth',
//   PORTAL_AUTH_SERVER_CLIENT: env.sunbird_portal_auth_server_client || 'portal',
//   APPID: process.env.sunbird_environment + '.' + process.env.sunbird_instance + '.portal',
//   DEFAULT_CHANNEL: 'niit-root-org',
//   EKSTEP_ENV: env.ekstep_env || 'qa',
//   PORTAL_PORT: env.sunbird_port || 3000,
//   PORTAL_API_AUTH_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMDFkYWI0OWNlNDU0ZWU1YjI5OWE5YzMyM2QzZDg5NSJ9.2PF-TgM62Di26Y8n0kUylBy5v_yuPQHd9erD4sN0OUw',
//   PORTAL_TELEMETRY_PACKET_SIZE: env.sunbird_telemetry_packet_size || 1000,
//   PORTAL_ECHO_API_URL: env.sunbird_echo_api_url || 'https://sunbird-intl.stackroute.com/api/echo/',
//   PORTAL_AUTOCREATE_TRAMPOLINE_USER: env.sunbird_autocreate_trampoline_user || 'true',
//   PORTAL_TRAMPOLINE_CLIENT_ID: env.sunbird_trampoline_client_id || 'trampoline',
//   PORTAL_TRAMPOLINE_SECRET: env.sunbird_trampoline_secret,
//   ENABLE_PERMISSION_CHECK: env.sunbird_enabless_permission_check || 0,
//   PORTAL_SESSION_STORE_TYPE: env.sunbird_session_store_type || 'in-memory',
//   PORTAL_CDN_URL: env.sunbird_portal_cdn_url || '',
//   CONTENT_SERVICE_UPSTREAM_URL: env.sunbird_content_service_upstream_url || 'http://localhost:5000/',
//   LEARNER_SERVICE_UPSTREAM_URL: env.sunbird_learner_service_upstream_url || 'http://localhost:9000/',
//   DATASERVICE_URL: env.sunbird_dataservice_url || 'https://sunbird-intl.stackroute.com/api/',
//   KEY_CLOAK_PUBLIC: env.sunbird_keycloak_public || 'https://sunbird-intl.stackroute.com/auth',
//   KEY_CLOAK_REALM: env.sunbird_keycloak_realm || 'sunbird',
//   CACHE_STORE: env.sunbird_cache_store || 'memory',
//   CACHE_TTL: env.sunbird_cache_ttl || 1800,
//   ANDROID_APP_URL: env.sunbird_android_app_url || 'http://www.stackroute.org',
//   BUILD_NUMBER: env.sunbird_build_number || packageObj.version + '.' + packageObj.buildHash,
//   TELEMETRY_SERVICE_LOCAL_URL: env.sunbird_telemetry_service_local_url || 'http://telemetry-service:9001/',
//   PORTAL_API_CACHE_TTL: env.sunbird_api_response_cache_ttl || '600',
//   TENANT_CDN_URL: env.sunbird_tenant_cdn_url || '',
//   CLOUD_STORAGE_URLS: env.sunbird_cloud_storage_urls,
//   PORTAL_CASSANDRA_CONSISTENCY_LEVEL: env.sunbird_cassandra_consistency_level || 'one',
//   PORTAL_CASSANDRA_REPLICATION_STRATEGY: env.sunbird_cassandra_replication_strategy || '{"class":"SimpleStrategy","replication_factor":1}',
//   PORTAL_EXT_PLUGIN_URL: process.env.sunbird_ext_plugin_url || 'http://player_player:3000/plugin/',
//   DEVICE_REGISTER_API: process.env.sunbird_device_register_api || 'https://api.open-sunbird.org/v3/device/register/',
//   sunbird_instance_name: env.sunbird_instance || 'Sunbird',
//   sunbird_theme: env.sunbird_theme || 'default',
//   sunbird_default_language: env.sunbird_portal_default_language || 'en',
//   sunbird_primary_bundle_language: env.sunbird_portal_primary_bundle_language || 'en',
//   learner_Service_Local_BaseUrl: env.sunbird_learner_service_local_base_url || 'http://learner-service:9000',
//   content_Service_Local_BaseUrl: env.sunbird_content_service_local_base_url || 'http://content-service:5000',
//   sunbird_explore_button_visibility: env.sunbird_explore_button_visibility || 'true',
//   sunbird_help_link_visibility: env.sunbird_help_link_visibility || 'false',
//   sunbird_extcont_whitelisted_domains: env.sunbird_extcont_whitelisted_domains || 'youtube.com,youtu.be',
//   sunbird_portal_user_upload_ref_link: env.sunbird_portal_user_upload_ref_link || 'http://www.sunbird.org/features-documentation/register_user',
//   GOOGLE_OAUTH_CONFIG: {
//     clientId: env.sunbird_google_oauth_clientId,
//     clientSecret: env.sunbird_google_oauth_clientSecret
//   },
//   KEYCLOAK_GOOGLE_CLIENT: {
//     clientId: env.sunbird_google_keycloak_client_id,
//     secret: env.sunbird_google_keycloak_secret
//   },
//   sunbird_google_captcha_site_key: env.sunbird_google_captcha_site_key
// }
// envVariables.PORTAL_CASSANDRA_URLS = (env.sunbird_cassandra_urls && env.sunbird_cassandra_urls !== '')
//   ? env.sunbird_cassandra_urls.split(',') : ['localhost']
// module.exports = envVariables

// 'use strict'
// const env = process.env
// const fs = require('fs')
// const packageObj = JSON.parse(fs.readFileSync('package.json', 'utf8'))
// let envVariables = {
//   LEARNER_URL: env.sunbird_learner_player_url || 'https://staging.open-sunbird.org/api/',
//   CONTENT_URL: env.sunbird_content_player_url || 'https://staging.open-sunbird.org/api/',
//   CONFIG_URL: env.sunbird_config_service_url || 'https://staging.open-sunbird.org/api/config/',
//   CONFIG_REFRESH_INTERVAL: env.config_refresh_interval || 10,
//   CONFIG_SERVICE_ENABLED: env.config_service_enabled || false,
//   CONTENT_PROXY_URL: env.sunbird_content_proxy_url || 'https://staging.open-sunbird.org/',
//   PORTAL_REALM: env.sunbird_portal_realm || 'sunbird',
//   PORTAL_AUTH_SERVER_URL: env.sunbird_portal_auth_server_url || 'https://staging.open-sunbird.org/auth',
//   PORTAL_AUTH_SERVER_CLIENT: env.sunbird_portal_auth_server_client || 'portal',
//   APPID: process.env.sunbird_environment + '.' + process.env.sunbird_instance + '.portal',
//   DEFAULT_CHANNEL: 'sunbird-staging',
//   EKSTEP_ENV: env.ekstep_env || 'qa',
//   PORTAL_PORT: env.sunbird_port || 3000,
//   PORTAL_API_AUTH_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2NTU0NDQ5ZWI0MGQ0YTI4ODQ3YzAzYWZlNmJjMmEyOCJ9.YhnTaDw_xvf8Q5S66QiO71-5WeqLaTPv-vvNZSwBqLk',
//   PORTAL_TELEMETRY_PACKET_SIZE: env.sunbird_telemetry_packet_size || 1000,
//   PORTAL_ECHO_API_URL: env.sunbird_echo_api_url || 'https://staging.open-sunbird.org/api/echo/',
//   PORTAL_AUTOCREATE_TRAMPOLINE_USER: env.sunbird_autocreate_trampoline_user || 'true',
//   PORTAL_TRAMPOLINE_CLIENT_ID: env.sunbird_trampoline_client_id || 'trampoline',
//   PORTAL_TRAMPOLINE_SECRET: env.sunbird_trampoline_secret,
//   ENABLE_PERMISSION_CHECK: env.sunbird_enabless_permission_check || 0,
//   PORTAL_SESSION_STORE_TYPE: env.sunbird_session_store_type || 'in-memory',
//   PORTAL_CDN_URL: env.sunbird_portal_cdn_url || '',
//   CONTENT_SERVICE_UPSTREAM_URL: env.sunbird_content_service_upstream_url || 'http://localhost:5000/',
//   LEARNER_SERVICE_UPSTREAM_URL: env.sunbird_learner_service_upstream_url || 'http://localhost:9000/',
//   DATASERVICE_URL: env.sunbird_dataservice_url || 'https://staging.open-sunbird.org/api/',
//   KEY_CLOAK_PUBLIC: env.sunbird_keycloak_public || 'https://staging.open-sunbird.org/auth',
//   KEY_CLOAK_REALM: env.sunbird_keycloak_realm || 'sunbird',
//   CACHE_STORE: env.sunbird_cache_store || 'memory',
//   CACHE_TTL: env.sunbird_cache_ttl || 1800,
//   ANDROID_APP_URL: env.sunbird_android_app_url || 'http://www.stackroute.org',
//   BUILD_NUMBER: env.sunbird_build_number || packageObj.version + '.' + packageObj.buildHash,
//   TELEMETRY_SERVICE_LOCAL_URL: env.sunbird_telemetry_service_local_url || 'http://telemetry-service:9001/',
//   PORTAL_API_CACHE_TTL: env.sunbird_api_response_cache_ttl || '600',
//   TENANT_CDN_URL: env.sunbird_tenant_cdn_url || '',
//   CLOUD_STORAGE_URLS: env.sunbird_cloud_storage_urls,
//   PORTAL_CASSANDRA_CONSISTENCY_LEVEL: env.sunbird_cassandra_consistency_level || 'one',
//   PORTAL_CASSANDRA_REPLICATION_STRATEGY: env.sunbird_cassandra_replication_strategy || '{"class":"SimpleStrategy","replication_factor":1}',
//   PORTAL_EXT_PLUGIN_URL: process.env.sunbird_ext_plugin_url || 'http://player_player:3000/plugin/',
//   DEVICE_REGISTER_API: process.env.sunbird_device_register_api || 'https://api.open-sunbird.org/v3/device/register/',
//   sunbird_instance_name: env.sunbird_instance || 'Sunbird',
//   sunbird_theme: env.sunbird_theme || 'default',
//   sunbird_default_language: env.sunbird_portal_default_language || 'en',
//   sunbird_primary_bundle_language: env.sunbird_portal_primary_bundle_language || 'en',
//   learner_Service_Local_BaseUrl: env.sunbird_learner_service_local_base_url || 'http://learner-service:9000',
//   content_Service_Local_BaseUrl: env.sunbird_content_service_local_base_url || 'http://content-service:5000',
//   sunbird_explore_button_visibility: env.sunbird_explore_button_visibility || 'true',
//   sunbird_help_link_visibility: env.sunbird_help_link_visibility || 'false',
//   sunbird_extcont_whitelisted_domains: env.sunbird_extcont_whitelisted_domains || 'youtube.com,youtu.be',
//   sunbird_portal_user_upload_ref_link: env.sunbird_portal_user_upload_ref_link || 'http://www.sunbird.org/features-documentation/register_user',
//   GOOGLE_OAUTH_CONFIG: {
//     clientId: env.sunbird_google_oauth_clientId,
//     clientSecret: env.sunbird_google_oauth_clientSecret
//   },
//   KEYCLOAK_GOOGLE_CLIENT: {
//     clientId: env.sunbird_google_keycloak_client_id,
//     secret: env.sunbird_google_keycloak_secret
//   },
//   sunbird_google_captcha_site_key: env.sunbird_google_captcha_site_key
// }
// envVariables.PORTAL_CASSANDRA_URLS = (env.sunbird_cassandra_urls && env.sunbird_cassandra_urls !== '')
//   ? env.sunbird_cassandra_urls.split(',') : ['localhost']
// module.exports = envVariables

// 'use strict'
// const env = process.env
// const fs = require('fs')
// const packageObj = JSON.parse(fs.readFileSync('package.json', 'utf8'))
// let envVariables = {
//   LEARNER_URL: env.sunbird_learner_player_url || 'http://sunbird-ilimi.stackroute.com/api/',
//   CONTENT_URL: env.sunbird_content_player_url || 'http://sunbird-ilimi.stackroute.com/api/',
//   CONFIG_URL: env.sunbird_config_service_url || 'http://sunbird-ilimi.stackroute.com/api/config/',
//   CONFIG_REFRESH_INTERVAL: env.config_refresh_interval || 10,
//   CONFIG_SERVICE_ENABLED: env.config_service_enabled || false,
//   CONTENT_PROXY_URL: env.sunbird_content_proxy_url || 'http://sunbird-ilimi.stackroute.com/',
//   PORTAL_REALM: env.sunbird_portal_realm || 'sunbird',
//   PORTAL_AUTH_SERVER_URL: env.sunbird_portal_auth_server_url || 'http://sunbird-ilimi.stackroute.com/auth',
//   PORTAL_AUTH_SERVER_CLIENT: env.sunbird_portal_auth_server_client || 'portal',
//   APPID: process.env.sunbird_environment + '.' + process.env.sunbird_instance + '.portal',
//   DEFAULT_CHANNEL: 'ilimi-Bangladesh-channel',
//   EKSTEP_ENV: env.ekstep_env || 'qa',
//   PORTAL_PORT: env.sunbird_port || 3000,
//   PORTAL_API_AUTH_TOKEN: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIxNDYzZmM2ZTA2NWY0M2E5OTUyMmFiOTY2MzI2ZDEyNiJ9.4D_O4HQiPn6ETLEh3bQKgmJHHBCTsEyHpbsrvrUQBZU',
//   PORTAL_TELEMETRY_PACKET_SIZE: env.sunbird_telemetry_packet_size || 1000,
//   PORTAL_ECHO_API_URL: env.sunbird_echo_api_url || 'http://sunbird-ilimi.stackroute.com/api/echo/',
//   PORTAL_AUTOCREATE_TRAMPOLINE_USER: env.sunbird_autocreate_trampoline_user || 'true',
//   PORTAL_TRAMPOLINE_CLIENT_ID: env.sunbird_trampoline_client_id || 'trampoline',
//   PORTAL_TRAMPOLINE_SECRET: env.sunbird_trampoline_secret,
//   ENABLE_PERMISSION_CHECK: env.sunbird_enabless_permission_check || 0,
//   PORTAL_SESSION_STORE_TYPE: env.sunbird_session_store_type || 'in-memory',
//   PORTAL_CDN_URL: env.sunbird_portal_cdn_url || '',
//   CONTENT_SERVICE_UPSTREAM_URL: env.sunbird_content_service_upstream_url || 'http://localhost:5000/',
//   LEARNER_SERVICE_UPSTREAM_URL: env.sunbird_learner_service_upstream_url || 'http://localhost:9000/',
//   DATASERVICE_URL: env.sunbird_dataservice_url || 'http://sunbird-ilimi.stackroute.com/api/',
//   KEY_CLOAK_PUBLIC: env.sunbird_keycloak_public || 'http://sunbird-ilimi.stackroute.com/auth',
//   KEY_CLOAK_REALM: env.sunbird_keycloak_realm || 'sunbird',
//   CACHE_STORE: env.sunbird_cache_store || 'memory',
//   CACHE_TTL: env.sunbird_cache_ttl || 1800,
//   ANDROID_APP_URL: env.sunbird_android_app_url || 'http://www.stackroute.org',
//   BUILD_NUMBER: env.sunbird_build_number || packageObj.version + '.' + packageObj.buildHash,
//   TELEMETRY_SERVICE_LOCAL_URL: env.sunbird_telemetry_service_local_url || 'http://telemetry-service:9001/',
//   PORTAL_API_CACHE_TTL: env.sunbird_api_response_cache_ttl || '600',
//   TENANT_CDN_URL: env.sunbird_tenant_cdn_url || '',
//   CLOUD_STORAGE_URLS: env.sunbird_cloud_storage_urls,
//   PORTAL_CASSANDRA_CONSISTENCY_LEVEL: env.sunbird_cassandra_consistency_level || 'one',
//   PORTAL_CASSANDRA_REPLICATION_STRATEGY: env.sunbird_cassandra_replication_strategy || '{"class":"SimpleStrategy","replication_factor":1}',
//   PORTAL_EXT_PLUGIN_URL: process.env.sunbird_ext_plugin_url || 'http://player_player:3000/plugin/',
//   DEVICE_REGISTER_API: process.env.sunbird_device_register_api || 'https://api.open-sunbird.org/v3/device/register/',
//   sunbird_instance_name: env.sunbird_instance || 'Sunbird',
//   sunbird_theme: env.sunbird_theme || 'default',
//   sunbird_default_language: env.sunbird_portal_default_language || 'en',
//   sunbird_primary_bundle_language: env.sunbird_portal_primary_bundle_language || 'en',
//   learner_Service_Local_BaseUrl: env.sunbird_learner_service_local_base_url || 'http://learner-service:9000',
//   content_Service_Local_BaseUrl: env.sunbird_content_service_local_base_url || 'http://content-service:5000',
//   sunbird_explore_button_visibility: env.sunbird_explore_button_visibility || 'true',
//   sunbird_help_link_visibility: env.sunbird_help_link_visibility || 'false',
//   sunbird_extcont_whitelisted_domains: env.sunbird_extcont_whitelisted_domains || 'youtube.com,youtu.be',
//   sunbird_portal_user_upload_ref_link: env.sunbird_portal_user_upload_ref_link || 'http://www.sunbird.org/features-documentation/register_user',
//   GOOGLE_OAUTH_CONFIG: {
//     clientId: env.sunbird_google_oauth_clientId,
//     clientSecret: env.sunbird_google_oauth_clientSecret
//   },
//   KEYCLOAK_GOOGLE_CLIENT: {
//     clientId: env.sunbird_google_keycloak_client_id,
//     secret: env.sunbird_google_keycloak_secret
//   },
//   sunbird_google_captcha_site_key: env.sunbird_google_captcha_site_key
// }
// envVariables.PORTAL_CASSANDRA_URLS = (env.sunbird_cassandra_urls && env.sunbird_cassandra_urls !== '')
//   ? env.sunbird_cassandra_urls.split(',') : ['localhost']
// module.exports = envVariables

'use strict'
const env = process.env
const fs = require('fs')
const packageObj = JSON.parse(fs.readFileSync('package.json', 'utf8'))

let envVariables = {
  LEARNER_URL: env.sunbird_learner_player_url || 'https://societal-sunbird.stackroute.com/api/',
  CONTENT_URL: env.sunbird_content_player_url || 'https://societal-sunbird.stackroute.com/api/',
  CONFIG_URL: env.sunbird_config_service_url || 'https://societal-sunbird.stackroute.com/api/config/',
  CONFIG_REFRESH_INTERVAL: env.config_refresh_interval || 10,
  CONFIG_SERVICE_ENABLED: env.config_service_enabled || false,
  CONTENT_PROXY_URL: env.sunbird_content_proxy_url || 'https://societal-sunbird.stackroute.com',
  PORTAL_REALM: env.sunbird_portal_realm || 'sunbird',
  PORTAL_AUTH_SERVER_URL: env.sunbird_portal_auth_server_url || 'https://societal-sunbird.stackroute.com/auth',
  PORTAL_AUTH_SERVER_CLIENT: env.sunbird_portal_auth_server_client || 'portal',
  APPID: process.env.sunbird_environment + '.' + process.env.sunbird_instance + '.portal',
  DEFAULT_CHANNEL: env.sunbird_default_channel || 'societal-Channel',
  EKSTEP_ENV: env.ekstep_env || 'qa',
  PORTAL_PORT: env.sunbird_port || 3000,
  PORTAL_API_AUTH_TOKEN: env.sunbird_api_auth_token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIzOWQxMzgzNTQwODU0YWIwOTA3ZDZiOTQwYjAxYTc5OSJ9.gbcimZpIUDibe7Az0_ba1y4HzZLslsP2kudPu9bBi7k',
  PORTAL_TELEMETRY_PACKET_SIZE: env.sunbird_telemetry_packet_size || 1000,
  PORTAL_ECHO_API_URL: env.sunbird_echo_api_url || 'https://societal-sunbird.stackroute.com/api/echo/',
  PORTAL_AUTOCREATE_TRAMPOLINE_USER: env.sunbird_autocreate_trampoline_user || 'true',
  PORTAL_TRAMPOLINE_CLIENT_ID: env.sunbird_trampoline_client_id || 'trampoline',
  PORTAL_TRAMPOLINE_SECRET: env.sunbird_trampoline_secret,
  ENABLE_PERMISSION_CHECK: env.sunbird_enabless_permission_check || 0,
  PORTAL_SESSION_STORE_TYPE: env.sunbird_session_store_type || 'in-memory',
  PORTAL_CDN_URL: env.sunbird_portal_cdn_url || '',
  CONTENT_SERVICE_UPSTREAM_URL: env.sunbird_content_service_upstream_url || 'http://localhost:5000/',
  LEARNER_SERVICE_UPSTREAM_URL: env.sunbird_learner_service_upstream_url || 'http://localhost:9000/',
  DATASERVICE_URL: env.sunbird_dataservice_url || 'https://societal-sunbird.stackroute.com/api/',
  KEY_CLOAK_PUBLIC: env.sunbird_keycloak_public || 'true',
  KEY_CLOAK_REALM: env.sunbird_keycloak_realm || 'sunbird',
  CACHE_STORE: env.sunbird_cache_store || 'memory',
  CACHE_TTL: env.sunbird_cache_ttl || 1800,
  ANDROID_APP_URL: env.sunbird_android_app_url || 'http://www.sunbird.org',
  BUILD_NUMBER: env.sunbird_build_number || packageObj.version + '.' + packageObj.buildHash,
  TELEMETRY_SERVICE_LOCAL_URL: env.sunbird_telemetry_service_local_url || 'http://telemetry-service:9001/',
  PORTAL_API_CACHE_TTL: env.sunbird_api_response_cache_ttl || '600',
  TENANT_CDN_URL: env.sunbird_tenant_cdn_url || '',
  CLOUD_STORAGE_URLS: env.sunbird_cloud_storage_urls,
  PORTAL_CASSANDRA_CONSISTENCY_LEVEL: env.sunbird_cassandra_consistency_level || 'one',
  PORTAL_CASSANDRA_REPLICATION_STRATEGY: env.sunbird_cassandra_replication_strategy || '{"class":"SimpleStrategy","replication_factor":1}',
  PORTAL_EXT_PLUGIN_URL: process.env.sunbird_ext_plugin_url || 'http://player_player:3000/plugin/',
  DEVICE_REGISTER_API: process.env.sunbird_device_register_api || 'https://api.open-sunbird.org/v3/device/register/',
  sunbird_instance_name: env.sunbird_instance || 'Sunbird',
  sunbird_theme: env.sunbird_theme || 'default',
  sunbird_default_language: env.sunbird_portal_default_language || 'en',
  sunbird_primary_bundle_language: env.sunbird_portal_primary_bundle_language || 'en',
  learner_Service_Local_BaseUrl: env.sunbird_learner_service_local_base_url || 'http://learner-service:9000',
  content_Service_Local_BaseUrl: env.sunbird_content_service_local_base_url || 'http://content-service:5000',
  sunbird_explore_button_visibility: env.sunbird_explore_button_visibility || 'true',
  sunbird_help_link_visibility: env.sunbird_help_link_visibility || 'false',
  sunbird_extcont_whitelisted_domains: env.sunbird_extcont_whitelisted_domains || 'youtube.com,youtu.be',
  sunbird_portal_user_upload_ref_link: env.sunbird_portal_user_upload_ref_link || 'http://www.sunbird.org/features-documentation/register_user',
  GOOGLE_OAUTH_CONFIG: {
    clientId: env.sunbird_google_oauth_clientId,
    clientSecret: env.sunbird_google_oauth_clientSecret
  },
  KEYCLOAK_GOOGLE_CLIENT: {
    clientId: env.sunbird_google_keycloak_client_id,
    secret: env.sunbird_google_keycloak_secret
  },
  sunbird_google_captcha_site_key: env.sunbird_google_captcha_site_key
}

envVariables.PORTAL_CASSANDRA_URLS = (env.sunbird_cassandra_urls && env.sunbird_cassandra_urls !== '')
  ? env.sunbird_cassandra_urls.split(',') : ['localhost']

module.exports = envVariables