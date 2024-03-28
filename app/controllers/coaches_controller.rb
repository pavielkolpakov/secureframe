class CoachesController < ApplicationController
    def index
        render json: Coach.all, each_serializer: CoachesSerializer
    end
end
