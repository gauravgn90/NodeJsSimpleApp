##############################
docker run  --name jenkins-slave \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e JENKINS_URL=http://192.168.1.50:8080 \
  -e JENKINS_SECRET=8d88a3a52ebc25d521ed57b99c4f72c1d8e6e4b6fbb01a70b1e2108a9ec174f0 \
  -e JENKINS_AGENT_NAME=agent2 \
  jenkins-slave


############################
FROM jenkins/jnlp-slave:latest-jdk11 

USER root

RUN apt-get update && apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common \
    && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add - \
    && apt-key fingerprint 0EBFCD88 \
    && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu xenial stable" \
    && apt-get update && apt-get install -y docker-ce-cli \
    && groupadd docker \
    && usermod -aG docker jenkins

USER jenkins

################################
docker run -p 8080:8080 -p 50000:50000 --name jenkins-server -v jenkins_home_at_host:/var/jenkins_home jenkins/jenkins:lts

############
sudo chmod 666 /var/run/docker.sock

###

https://narenchejara.medium.com/build-and-publish-docker-images-using-jenkins-pipeline-3b14e92fa2b4