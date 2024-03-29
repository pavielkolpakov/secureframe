class AppointmentController < ApplicationController
    def index
        available_times = []

        day = Date.parse(params[:date]).strftime('%A')
        schedule = Schedule.where(coach_id: params[:coach_id], day_of_the_week: day)
        schedule.each do |day|
            (Time.parse(day.available_at).to_i..Time.parse(day.available_until).to_i).step(30.minutes).each do |time|
                actual_time = Time.at(time).strftime("%H:%M")
                time_format = "#{params[:date]} #{actual_time}"
                
                next if Appointment.find_by(date: time_format, coach_id: params[:coach_id]) or Time.at(time) == Time.parse(day.available_until)
                available_times << actual_time
            end
        end

        render json: { available_times: available_times }
    end

    def create
        if Appointment.find_by(date: params[:date], coach_id: params[:coach_id])
            render json: {error: "Appointment exists!"}, status: 409
        else
            Appointment.create(
                name: params[:name], 
                email: params[:email], 
                date: params[:date], 
                coach_id: params[:coach_id]
            )

            render json: {message: "appointment booked!"}
        end
    end
end
