class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in

  private

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def login(user)
    user.reset_session_token!
    session[:session_token] = user.reset_session_token!
  end

  def logout
    if current_user
      current_user.reset_session_token!
      session[:session_token] = nil
      return true
    else
      return false
    end
  end

  private

  def logged_in
    unless current_user
      return false
    end
    return true
  end
end
