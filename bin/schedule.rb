require 'csv'
require 'time'
require 'kramdown'
require 'kramdown-parser-gfm'
require 'json'

csv = CSV.read("suno pi toki pona 2023 - main stream schedule.csv", headers: true)
array = []
csv.each do |row|
  output = {}

  start_date, end_date = row['time in UTC'].split('-').map {|d| Time.parse(d)}
  time_diff = (end_date - start_date).to_i / 60
  output[:duration] = (time_diff) < 0 ? 1440 + time_diff : time_diff

  if row['time OK?']
    output[:performer] = row['by']
    output[:title] = row['title'] || ''
    output[:title] += " | #{row['title (toki pona)']}" if row['title (toki pona)']
    output[:categories] = []
    output[:categories] << row['category'] if row['category']
    output[:categories] << "language: #{row['language']}" if row['language']
    output[:description] = "<div lang=\"en\">#{Kramdown::Document.new(row['description'] || '', input: 'GFM').to_html}</div>"
    output[:description] += "<div lang=\"tok\">#{Kramdown::Document.new(row['desciption (toki pona)'], input: 'GFM').to_html}</div>" if row['desciption (toki pona)']

    row['links']&.split&.each do |link|
      if link.include?('bandcamp')
        output[:bandcamp] = link
      elsif link.include?('youtube')
        output[:youtube] = link
      elsif link.include?('spotify')
        output[:spotify] = link
      elsif link.include?('discord')
        output[:discord] = link
      elsif link.include?('ko-fi')
        output[:kofi] = link
      else
        output[:website] = link if link.start_with?('http')
      end
    end
  end
  array << output
end

puts array.to_json
