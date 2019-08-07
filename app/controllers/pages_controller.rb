class PagesController < ApplicationController
  def prerendered_react_root
    react_page prerender: true
  end

  def react_root
    react_page
  end

end
