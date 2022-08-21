# Write-up Template

## Analyze, choose, and justify the appropriate resource option for deploying the app.

*For **both** a VM or App Service solution for the CMS app:*
- *Analyze costs, scalability, availability, and workflow*
- *Choose the appropriate solution (VM or App Service) for deploying the app*
- *Justify your choice*
### Analysis on features of this application

1. This flask based CMS application is built new, means there is a choice of hosting it in many of the compute options such as VM, Azure app services, container, microservice, AKS, etc.

2. This application does not depend on complex Microsoft tech stack such as /.NET which dependent on C++ and other, so specific azure service requirement already eliminated.

3. The AKS (Azure Kubernetes Service) and Azure Container Instances were ruled out as this application does not need fully fledged orchestration.  

4. The AKS could be an option when it demands scale , load patters (autoscaling) in the future

- So as on today there were just 2 options
   1. VM Based deployment
   2. Azure App services

- I choose the Azure App service instead of VM based deployment due to the reasons mentioned below

### Variours factors depends on choosing App service over VM and some are:

1. Technology & Software stack :- The application is a sef contained python/flask application. The database is deployed outside application deployment boundaries. This means the deployment in the app-server is just python which need an execution which can execute python. As the application is not bound to specific capabilities of hardware, unique software - this is best suited to App service deployment (which support specific set of platforms such as .NET, python, nodeJS etc)

1. SSL :- The VM needs SSL to be configured in the terminating devices such as Load balancers, reverse proxy (Nginx) or in VM itself. This posses an additional administrative overhead and coast. The App service inherently support SSL (managed SSL)

1. Architecture style:- The CMS application is a web application rather than an N-Tier or Big compute (HPC). An App service is better suited for a Non HPC Web tier/Queue Worker application. Additionally we don't currently need an event driven framework or scalable micro-service style (like service fabric/AKS). So obviously App service make a better choice here.

1. Cost :- The basic deployment with 10 GB pay as you go price is $0.075/hour, with support of 3 instances for dev and 50GB with 10 instances cost $0.10/hour. The cost is substantially lower when compared to a VM where you need manage OS, patches and application deployment manually (IaS). Additionally a free tier with 1 GB RAM with 1GB storage with F1 instance can be used for dev with no cost overhead. This is more cost effective especially with Linux workload. On the other hand VM (especially the reserved VM or PAYG) is much more expensive as Spot instances can't be used for this CMS app. Although a general purpose VM (AV2) costs much less, which only provide zonal redundancy. On the other hand a compute optimized VM (e,g FSv2) costs no less tha 0.01. But A VM has admin overhead such as backup restore. Although IaaS (VM), looks to be cheaper, it has much higher TCO and operating cost. See reference [here](https://www.bmc.com/blogs/saas-vs-paas-vs-iaas-whats-the-difference-and-how-to-choose/)

1. SLA

    The below are the SLA for app services [Ref](https://azure.microsoft.com/en-gb/support/legal/sla/app-service/v1_4/)

    | MONTHLY UPTIME PERCENTAGE        | SERVICE CREDIT            |
    | ------------- |:-------------:|
    | < 99.95%       |10% |
    | < 99% | 25%      |

    However VM provide comparable SLA only when deployed across two or more Availability Zones in the same region:
    | MONTHLY UPTIME PERCENTAGE        | SERVICE CREDIT            |
    | ------------- |:-------------:|
    | < 99.99%       |10% |
    | < 99% | 25%      |
    | < 95% | 100%      |

    The only downside of app service is that this is not available in all geographies unlike VMs which is a basic service available everywhere

1. IaaS (VM) vs PaaS (App service)VM - as Infrastructure-as-a-Service (IaaS) where there is an overhead in managing VMs along with the associated networking and storage components. Although this gives rights to deploy whatever software and applications we want onto those VMs. This model is the closest to a traditional on-premises environment, except that Microsoft manages the infrastructure. and we still manage the individual VMs.

1. Platform-as-a-Service (PaaS)- App service provides a managed hosting environment, where we can deploy your application without needing to manage VMs or networking resources. Azure App Service is a PaaS service.

1. Nature of the application & Workflow

   * Devops friendliness :- The CMS is a stateless application ,where app service is best suited for. Also App service support containers and CMS can be easily converted to a container.  Another aspect is deployment friendliness . The cloud native CI/CD ( Azure devops/ GitHub Actions) and availability deployment slots make the app service very CI/CD friendly while VM deployment needs more complex deployment process

   * Web :- The CMS is a web application.  The web hosting is built in App service unlike in VM where users need to manage web servers themselves

   * Application update: - The concept of deployment slot (unlike VM), makes it very easy upgrade and rollback App services

1. Scalability

    * Autoscaling :- Autoscaling is built in in App service while VM need to use VM scale-set, which expensive may need more complex configuration to manage web application  
  
    * Load balancing: - The App service comes with Integrated load balancer where VM scale-set need additional Azure LBs. This makes App service deployment for this Python based CMS cost effective , simple yet efficient.
  
    * Although VM supports up to 1000 nodes per scale set while App service only 100 (30 instances, 100 with App Service Environment), the App service is a better choice as the CMS application does not demand for such scale at this point of time

1. Availability

   * Both App services and VM allows multi region availability.



## Assess app changes that would change your decision.

In the future due to adaptation of technical stack and resources might be change will be need. And those changes are describe below:

1. If there will be in need of some new or complex tech stack which azure web app will not able to handle then in such case VM based option we may think of.

2. If app is containerized and have heavy user traffic then we can think of sererate infrastructure.

3. If the application need a full fledged orchestration with kubernate attachment, then we will go with the VM based service.

4. If application have different services running parallel in Microservice base architecture than we will prefer VM and will be mandatory as cost saving will be more. 

5. The VM deployment, although could thought of , Its unlikely. So I would think that this app will be containerized and deployed on AKS in the near future depends on the user growth. Fortunately current tech stack make it easy to make such transformation.
