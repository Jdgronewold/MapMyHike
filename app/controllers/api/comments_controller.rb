class Api::CommentsController < ApplicationController

  def create

    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    if(params[:activity][:type] == "hike")
      @activity = Hike.includes(:user).find(params[:activity][:id])
      @comment.update_attribute(:activity, @activity)
    else
      @activity = Workout.includes(:user).find(params[:activity][:id])
      @comment.update_attribute(:activity, @activity)
    end

    if @comment.save
      render :show
    else
      render json: ["Could not save comment"], status: 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy

    if(params[:activity][:type] == "hike")
      @activity = Hike.includes(:user).find(params[:activity][:id])
    else
      @activity = Workout.includes(:user).find(params[:activity][:id])
    end

    # @activity.includes(comments: [:author])
    render :show
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end

# create an api util that takes two arguments - a comment and an
# activity object with a type k/v pair and id k/v pair

# make an ajax request to create a comment that then returns the
# new activity with the appropriate key to overwrite the old activity
# from the activities slice of the state
