class CoachesSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :timezone,
             :available_days

  def available_days
    object.schedules.map do |day| 
      day.day_of_the_week
    end
  end
end
