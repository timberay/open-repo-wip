module RegistryErrorHandler
  extend ActiveSupport::Concern

  included do
    rescue_from DockerRegistryService::AuthenticationError, with: :handle_auth_error
    rescue_from DockerRegistryService::NotFoundError, with: :handle_not_found
    rescue_from DockerRegistryService::RegistryError, with: :handle_registry_error
  end

  private

  def handle_auth_error(exception)
    render plain: "Authentication failed: #{exception.message}", status: :unauthorized
  end

  def handle_not_found(exception)
    render plain: "Not found: #{exception.message}", status: :not_found
  end

  def handle_registry_error(exception)
    render plain: "Registry error: #{exception.message}", status: :bad_gateway
  end
end
