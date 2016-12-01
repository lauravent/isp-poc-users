FROM registry.ng.bluemix.net/ibmnode:v4

MAINTAINER Roberto Pozzi <roberto_pozzi@it.ibm.com>

# Update libs
RUN apt-get update \ 
	&& apt-get -y upgrade \ 
	&& apt-get -y autoclean \ 
	&& apt-get -y autoremove \ 
	&& rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Create a directory and a related VOLUME to store nodejs application files
RUN rm -rf /ispPocUsers
RUN mkdir /ispPocUsers
#VOLUME /ispPocUsers

# Set node application home dir as the working dir
WORKDIR /ispPocUsers

# Add node application files
ADD . /ispPocUsers

# Install dependencies
RUN npm install .

EXPOSE :8081

ENTRYPOINT  ["node", "app"]