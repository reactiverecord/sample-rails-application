module ActiveModel
  class Errors
    def generate_message(attribute, type = :invalid, options = {})
      type = options.delete(:message) if options[:message].is_a?(Symbol)

      if @base.class.respond_to?(:i18n_scope)
        defaults = @base.class.lookup_ancestors.map do |klass|
          [ :"#{@base.class.i18n_scope}.errors.models.#{klass.model_name.i18n_key}.attributes.#{attribute}.#{type}",
            :"#{@base.class.i18n_scope}.errors.models.#{klass.model_name.i18n_key}.#{type}" ]
        end
      else
        defaults = []
      end

      defaults << :"#{@base.class.i18n_scope}.errors.messages.#{type}" if @base.class.respond_to?(:i18n_scope)
      defaults << :"errors.attributes.#{attribute}.#{type}"
      defaults << :"errors.messages.#{type}"

      defaults.compact!
      defaults.flatten!

      key = defaults.shift
      defaults = options.delete(:message) if options[:message]
      value = (attribute != :base ? @base.send(:read_attribute_for_validation, attribute) : nil)

      options = {
        default: defaults,
        model: @base.model_name.human,
        model_downcase: @base.model_name.human.downcase,
        model_with_article: @base.model_name.human.with_indefinite_article.humanize,
        model_with_article_downcase: @base.model_name.human.with_indefinite_article.humanize.downcase,
        attribute: @base.class.human_attribute_name(attribute),
        attribute_downcase: @base.class.human_attribute_name(attribute).downcase,
        attribute_with_article: @base.class.human_attribute_name(attribute).with_indefinite_article.humanize,
        attribute_with_article_downcase: @base.class.human_attribute_name(attribute).with_indefinite_article.humanize.downcase,
        value: value,
        object: @base
      }.merge!(options)

      I18n.translate(key, options)
    end
  end
end
