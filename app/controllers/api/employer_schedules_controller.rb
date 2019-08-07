class Api::EmployerSchedulesController < ApplicationController
  def index
    render json: EmployerSchedule.all, status: :ok
  end

  def email_exists
    if EmployerSchedule.where(email: params[:email]).exists?
      return render json: { exists: true }, status: :ok
    end
    return render json: { exists: false }, status: :not_found
  end

  def create
    employer_schedule = EmployerSchedule.new(params.require(:employer_schedule).permit!)
    if employer_schedule.save
      return render json: employer_schedule, status: :created
    end
    render json: { errors: employer_schedule.errors }, status: :unprocessable_entity
  end

  def show
    employer_schedule = EmployerSchedule.find(params[:id])
    render json: employer_schedule, status: :ok
  end

  def destroy
    EmployerSchedule.find(params[:id]).destroy
    head :no_content
  end
end
