# IMY220 (Advanced Web Technologies) Semester Project - Michael Stone: u21497682
This project consists of creating a Playlist Sharing Website using web technologies that I've been taught in the module IMY220

With the server not running, we type the following into the terminal: "docker build -t u21497682_imy220_project ." and then run it.
"u21497682_imy220_project" is the image name

Now that it has built the docker file and has done so succesfully, we now need to run the image and convert it to a container:
"docker run --name u21497682_imy220project_container -p 3000:3000 u21497682_imy220_project"

You can then use the following command to stop the container from running:
"docker stop u21497682_imy220project_container"