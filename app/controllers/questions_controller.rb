class QuestionsController < ApplicationController
  include DetermineUserAndUnits

  layout "application_fluid"

  def show
    #@countries = Location.select(:country_code).distinct.collect { |loc| loc.country_code }

    @question = Question.friendly.find(params[:id])
    @answers = Answer.where(question_id: @question.id).count

    #extracting all of the users that answered this question
    @users_list = Array.new
    Answer.where(question_id: @question.id).find_each do |answer|
      @users_list << answer.user_id
    end
    #extracting all of the answers for the question
    @answers_given = Array.new
    Answer.where(question_id: @question.id).find_each do |answer|
      @answers_given << answer.value
    end

    #extracting all of the countries that answered the question
    @countries_array = Array.new
    @users_list.each do |user|
      @countries_array << Location.where(user_id: user).pluck(:country)
    end
    
    # @country_hash = Hash.new
    # @countries_answered.each do |country|
    # #   if (@country_hash[country] == nil)
    #     @country_hash = {country => 1}
    #   else
    #     @country_hash = {country => @country_hash[country] + 1}
    #   end
     #end

    # @dropdown_array = Array.new
    # @country_hash.each do |key, value|
    #   if (key != nil && value != nil)
    #     @dropdown_array << key + " " + "(" + value.to_s + " answered" + ")"
    #   end
    # end

    #update_nil_country()
    if(@user == nil)
      check_guest()
    end

    if @user
      @user_country = Location.where(user_id: @user.id).first
      @dropdown_array = [@user_country.country]

      @answer = @question.answers.where(user_id: @user.id).first
      if @answer.nil?
        @user_submitted_answer = false
        @answer = @question.answers.build(user: @user)
      else
        @user_submitted_answer = true
      end
    end
  end

  def new
    @subquestion = Question.new
  end

  def create

    if(@user == nil)
      check_guest()
    end

    #concatenate the answer boxes into one string, checking for empty boxes and removing them
    6.times do |count|
      counter = "answer_box_#{count}".to_sym
      unless (params[counter].to_s.empty?)
        @answerboxes = @answerboxes.to_s + params[counter].to_s << '|'
      end
    end
    #strip the last comma
    @answerboxes = @answerboxes[0...-1]

    @subquestion = Question.create(
      :label => params[:submit_question_name],
      :group_id => params[:group_id],
      :user_id => @user.id,
      :value_type => params[:value_type],
      :options_for_collection => @answerboxes)

    GroupsQuestion.create(group_id: params[:group_id], question_id: @subquestion.id)

    #the logic works, just need to output the error message in the else statement.
    if @subquestion.valid?
      #@subquestion.user_id = @user.id
      redirect_to question_path(@subquestion)
    else
      redirect_to categories_path
      flash[:notice] = "This Question has already been asked!!!"
    end
  end

end
