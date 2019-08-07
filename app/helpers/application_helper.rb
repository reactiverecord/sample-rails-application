module ApplicationHelper
  def head_tags
    head = []
    head << { element: "meta", props: { charSet: "utf-8" }}
    head << { element: "meta", props: { httpEquiv: "X-UA-Compatible", content: "IE=edge" }}
    head << { element: "meta", props: { name: "viewport", content: "width=device-width, initial-scale=1" }}
    head << { element: "meta", props:{ name: "csrf-param", content: request_forgery_protection_token }}
    head << { element: "meta", props:{ name: "csrf-token", content: form_authenticity_token }}
    head
  end

  def body_tags
    body = { open: [], close: [] }
    body[:close] << {
      element: "script",
      props: {
        type: "text/javascript",
        src: asset_pack_path(@asset_pack_path || "application.js"),
        dangerouslySetInnerHTML:{ __html: "" }
      }
    }
    body
  end

  def head_tags_html
    convert_to_html(head_tags)
  end

  def body_open_html
    convert_to_html(body_tags[:open])
  end

  def body_close_html
    convert_to_html(body_tags[:close])
  end

  def convert_to_html(arr)
    html = []
    arr.each do |elem|
      tag = "<#{elem[:element]}"
      children = elem[:props].delete(:dangerouslySetInnerHTML)
      if elem[:props].any?
        tag += " "
        tag += elem[:props].map{|k,v| "#{k.to_s.sub("charSet","charset").sub("httpEquiv", "http-equiv")}=\"#{v}\"" }.join(" ")
      end
      if children
        tag += ">"
        tag += children[:__html]
        tag += "</#{elem[:element]}>"
      else
        tag += " />"
      end
      html << tag
    end
    html.join.html_safe
  end
end
