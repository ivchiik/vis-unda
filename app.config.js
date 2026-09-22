const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

module.exports = ({ config }) => {
  const services = JSON.parse(
    readFileSync(resolve(__dirname, config.android.googleServicesFile), "utf8")
  );
  const client = services.client.find(
    (entry) => entry.client_info.android_client_info.package_name === config.android.package
  );
  const googleWebClientId = client?.oauth_client?.find(
    (entry) => entry.client_type === 3
  )?.client_id;

  if (!googleWebClientId) {
    throw new Error(
      "Download google-services.json with Google Authentication enabled before building."
    );
  }

  return {
    ...config,
    extra: { ...config.extra, googleWebClientId },
  };
};
