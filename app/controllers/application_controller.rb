class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token , if: :format_json?
  before_action :assign_uuid

  def stubbed_redux_state(partial_state={})
    default_state = {
      ui: {
        pageErrorStatuses: {}
      },
      models: {
        _isReactiveRecord: true
      }
    }
    default_state.deep_merge(partial_state) do |key, initial_val, next_val|
      initial_val + next_val rescue next_val
    end
  end

  def stubbed_reactiverecord(record=nil, json_options={})
    {
      _request: {
        status: record.nil? ? nil : 200,
        body: nil
      },
      _attributes: record.nil? ? {} : record.as_json(json_options),
      _errors: {}
    }
  end

  def stubbed_reactiverecord_collection(collection=nil, primary_key=:id, json_options={})
    {
      _request: {
        status: collection.nil? ? nil : 200,
        body: nil
      },
      _collection: collection.nil? ? {} : collection.map{|b| stubbed_reactiverecord(b, json_options) }.index_by{|b| b[:_attributes][primary_key.to_s] }
    }
  end

  def after_sign_in_path(user)
    # if user.admin?
    #   return users_path
    # end
    super
  end

  def ghosting_user
    @ghosting_user ||= User.find(session[:ghosting_user]) if session[:ghosting_user]
  end

  def assign_uuid
    unless cookies.signed[:uuid].present?
      begin
        uuid = SecureRandom.hex(5)
      end while uuid_exists(uuid)
      cookies.signed.permanent[:uuid] = { value: uuid, httponly: true }
    end
  end

  def uuid_exists(uuid)
    false
    # CartItem.where(device_uuid: uuid).exists?
  end

  protected
    def add_ghosting_info(user=current_user)
      user.uid = session[:uid] if session[:uid].present?
      object = user.as_json
      if ghosting_user
        object[:level] = ghosting_user.level
        object[:ghost_token] = ghosting_user.token
      end
      object
    end

    def react_page(prerender: false, **opts)
      # @asset_pack_path defaults to application.js
      # @react_class defaults to App
      @react_page = true
      if prerender && !Rails.env.development?
        opts.merge!(layout: false, locals: { prerender: true })
      end
      render "react_page", opts
    end

    def authenticate_admin!
      if !current_user
        authenticate_user!
      elsif !current_user.admin?
        if request.format.json?
          render(json: {}, status: :forbidden) and return
        end
        redirect_to root_path and return
      end
    end

    def format_json?
      request.format.json?
    end
end
