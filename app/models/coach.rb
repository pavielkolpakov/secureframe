class Coach < ApplicationRecord
    has_many :schedules, class_name: "Schedule", foreign_key: "coach_id"
end
