# EngX Approach


## Optimize for Cycle Time

Our key metric and north star is cycle time, as this is a aggregate measure of
flow efficiency and a leading metric for value delivery.

## DX

Good developer experience and fast feedback looks are critical for minimizing
waiting time, while also decreasing frustration, which increases processing
them. It should be easy for developers to set up there working environmnet, to
see their code and tests running in a producion-like envivornment, to share
their work for testing and review.

To accomplish this, we will automate the deployment of the application
leveraging kubernetes namespaces to create production-like enviroments across
delivery pipeline, including on the developers desktop (VDI), using Kubernetes
via Docker Desktop.

For the first sprint we will use docker compose with docker desktop for local
enviroments as we author the autmation to use kuberenetes namespaces.

#### Risk

Maybe obstacles in getting this working on the VDI, including client policy and
aproval delays.

##### Mitigation:

Try it as soon as possible Alternative:

##### Alternative

Allow developers to deploy their own working namescapes on the hosted
kubernetes cluster.

## QA

The DX approach described above will also have a benifit of increasing QA
efficiency by allowing a degree of testing to be shifted left and run in the
developers own workspaces before code is even pushed to github, meaning that
defects are discovered earlier in the process and thus resolved with less cost,
effort, amd time lost, and reducing "works on my machine" issues.

In order to further maximize QA efficiency, we want to leverage the automation
created for DX to deploy ephemerial preview enviroment for code review and
testing, this reduces wait time for QAs by allowing us to spin up an
environment for each pull request, thus eliminating contention for QA
environments. By using ephemerial preview enviroments instead of long lived
shared enviroments, we also increase the reliability of test results by
eliminating configuration drift and state build up.

## SCM

Source Countrol will be in GitHub

The main application (webapp) will be in a Monorepo, this will include
    - Main UI
    - Applications features, i.e. Login, Alarms, etc
    - Design Component Packages
    - Insight Microfrontends

We will use Trunk Based Development, Short Lived Feature Branches.

Branches should be branched directly off main and come back as pull requests into the main/trunk.

