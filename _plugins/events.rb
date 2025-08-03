# frozen_string_literal: true

def load_json(year)
  JSON.load_file("_data/#{year}.json")
end

class EventPage < Jekyll::Page
  def initialize(site, year, event)
    @site = site
    @ext = '.html'
    @name = "_layouts/event#{ext}"
    @relative_path = generate_permalink(year, event['track'] || 'default', event['stamp_start']) + "index#{ext}"
    super(site, site.source, '', name)

    self.data = populate_data(year, event)
  end

  def populate_data(year, event)
    data = {}
    data['layout'] = 'event'
    data['permalink'] = generate_permalink(year, event['track'] || 'default', event['stamp_start'])
    data['title'] = "suno pi toki pona #{year} - #{event['title']}"
    data['description'] = event['description'].gsub(/<\/?[^>]*>/, "")
    data['image'] = "/assets/sitelen/suno.png"
    data['favicon'] = "suno.ico"
    data['color'] = "#3584e4"
    data['event'] = event
    data['year'] = year
    data
  end

  def generate_permalink(year, track, time)
    "/#{year}/tenpo/#{track}/#{time}/"
  end
end

Jekyll::Hooks.register :site, :after_reset do |site|
  [2025].each do |year|
    load_json(year).each do |event|
      site.pages << EventPage.new(site, year, event)
    end
  end
end
