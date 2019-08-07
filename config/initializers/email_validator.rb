class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attr_name, value)
    unless value.blank?
      unless value.match(EMAIL_REGEX) #you'll need to define email regex
         record.errors.add(attr_name, :email, options.merge(value: value))
      end
    end
  end
end

# This allows us to assign the validator in the model
module ActiveModel::Validations::HelperMethods
  def validates_email(*attr_names)
    validates_with EmailValidator, _merge_attributes(attr_names)
  end
end
