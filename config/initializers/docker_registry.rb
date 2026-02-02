Rails.application.configure do
  config.registry_url = ENV.fetch("REGISTRY_URL", "https://registry.hub.docker.com")
  config.registry_username = ENV["REGISTRY_USERNAME"]
  config.registry_password = ENV["REGISTRY_PASSWORD"]
  config.use_mock_registry = ENV.fetch("USE_MOCK_REGISTRY", "true") == "true"
end
