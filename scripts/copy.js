chrome.storage.local.get(['ctoolhuAuthToken'], function(data) {
	var authToken = data.ctoolhuAuthToken;
	if (typeof authToken === 'undefined' || authToken == null) {
		alert('No auth token set');
		return;
	}

	var url = document.URL;

	// Find out what item type we're trying to copy, and run the appropriate function
	if (/courses\/\d+\/assignments\/\d+/.test(url))
		copyAssignment(authToken);
	else if (/courses\/\d+\/discussion_topics\/\d+/.test(url))
		copyDiscussion(authToken);
	else if (/courses\/\d+\/pages\/[^\/]+$/.test(url))
		copyPage(authToken);
	else if (/courses\/\d+\/quizzes\/\d+/.test(url))
		copyQuiz(authToken);
	else
		alert("Not a valid item to copy");
});

async function copyAssignment(authToken) {
	var assignment = await paginate(getAPIEndpoint(), '', authToken);

	var copiedData = {};

	copiedData.item_type = 'assignment';
	copiedData.name = assignment.name;
	copiedData.submission_types = assignment.submission_types;
	copiedData.allowed_extensions = assignment.allowed_extensions;
	copiedData.turnitin_enabled = assignment.turnitin_enabled;
	copiedData.vericite_enabled = assignment.vericite_enabled;
	copiedData.turnitin_settings = assignment.turnitin_settings;
	copiedData.peer_reviews = assignment.peer_reviews;
	copiedData.automatic_peer_reviews = assignment.automatic_peer_reviews;
	copiedData.grade_group_students_individually = assignment.grade_group_students_individually;
	copiedData.external_tool_tag_attributes = assignment.external_tool_tag_attributes;
	copiedData.points_possible = assignment.points_possible;
	copiedData.grading_type = assignment.grading_type;
	copiedData.due_at = assignment.due_at;
	copiedData.lock_at = assignment.lock_at;
	copiedData.unlock_at = assignment.unlock_at;
	copiedData.description = assignment.description;
	copiedData.assignment_overrides = assignment.assignment_overrides;
	copiedData.only_visible_to_overrides = assignment.only_visible_to_overrides;
	copiedData.published = assignment.published;
	copiedData.omit_from_final_grade = assignment.omit_from_final_grade;
	copiedData.quiz_lti = assignment.quiz_lti;
	copiedData.moderated_grading = assignment.moderated_grading
	copiedData.grader_comments_visible_to_graders = assignment.grader_comments_visible_to_graders;
	copiedData.graders_anonymous_to_graders = assignment.graders_anonymous_to_graders;
	copiedData.graders_names_visible_to_final_grader = assignment.graders_names_visible_to_final_grader;
	copiedData.anonymous_grading = assignment.anonymous_grading;
	copiedData.rubric = assignment.rubric;
	copiedData.rubric_settings = assignment.rubric_settings;

	chrome.storage.local.set({'copiedData': copiedData}, function() {
		console.log('Successfully copied item');
	});

	alert("Item Copied");
}

function copyDiscussion(authToken) {
	alert("Discussion found");
}

async function copyPage(authToken) {
	var page = await paginate(getAPIEndpoint(), '', authToken);

	var copiedData = {};

	copiedData.item_type = 'page';
	copiedData.title = page.title;
	copiedData.body = page.body;
	copiedData.published = page.published;

	chrome.storage.local.set({'copiedData': copiedData}, function() {
		console.log('Successfully copied item');
	});

	alert("Item Copied");
}

function copyQuiz(authToken) {
	alert("Quiz found");
}