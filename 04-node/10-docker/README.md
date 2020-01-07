# Docker



## 一、初识 Docker

### 1、Docker 是什么

- Build,Ship and Run Any App,Anywhere — 一次封装，到处执行。
- 基于 Linux 的高效、敏捷、轻量级的容器(轻量虚拟)方案。

> 虚拟技术
>
> - 完全虚拟化 VMware Workstation ，VirtualBox
> - 硬件辅助虚拟化 InterVT AMD-V
> - 超虚拟化 Xen
> - 操作系统级 Docker LXC 容器

### 2、特点

- 高效的利用系统资源
- 快速的启动时间
- 一致的运行环境
- 持续交付和部署
- 更轻松的迁移

### 3、对比传统虚拟机总结

| 特性       | 容器               | 虚拟机     |
| ---------- | ------------------ | ---------- |
| 启动       | 秒级               | 分钟级     |
| 硬盘使用   | 一般为`MB`         | 一般为`GB` |
| 性能       | 接近原生           | 弱于       |
| 系统支持量 | 单机支持上千个容器 | 一般几十个 |



## 二、Docker安装

主机：ubuntu_18_04_x64



```
 # apt升级
sudo apt-get update

# 添加相关软件包
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
    
# 下载软件包的合法性，需要添加软件源的 GPG 密钥
curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg | sudo apt-key add -

# source.list 中添加 Docker 软件源 
sudo add-apt-repository \
    "deb [arch=amd64] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu \
    $(lsb_release -cs) \
    stable"
    
# 安装 Docker CE
sudo apt-get update
sudo apt-get install docker-ce

# 启动 Docker CE
sudo systemctl enable docker
sudo systemctl start docker

# 建立 docker 用户组(附加)
sudo groupadd docker
sudo usermod -aG docker $USER

# Helloworld测试
docker run hello-world
 
```



**镜像加速**

- [Azure中国镜像](https://dockerhub.azk8s.cn)
- [阿里云加速器(需登录账号获取)](https://cr.console.aliyun.com/)
- [七牛云加速器](https://reg-mirror.qiniu.com)

```
# /etc/docker/daemon.json
{
  "registry-mirrors": [
    "https://dockerhub.azk8s.cn",
    "https://reg-mirror.qiniu.com"
	] 
}

sudo systemctl daemon-reload
sudo systemctl restart docker
```



## 三、简单Nginx服务

```
# 拉取官方镜像 - 面向docker的只读模板 
docker pull nginx

# 查看
docker images nginx

# 启动镜像
mkdir www
echo 'hello docker!!' >> www/index.html

# 启动
# www目录里面放一个index.html
docker run -p 8000:80 -v $PWD/www:/usr/share/nginx/html nginx

# 后台启动
docker run -p 80:80 -v $PWD/www:/usr/share/nginx/html -d nginx

# 停止
docker stop ff6

# 查看进程
docker ps
docker ps -a // 查看全部

# 伪终端 ff6容器的uuid
docker exec -it ff6 /bin/bash

# 删除镜像 
docker rm ff6
 
```



## 四、Docker运行过程



- 镜像（Image）

  面向Docker的只读模版

- 容器（Container）

  镜像的运行实例

- 仓库（Registry）

  存储镜像的服务器

  

## 五、Dockerfile定制镜像

> 镜像的定制实际上就是定制每一层所添加的配置、文件。如果我们可以把每一层修改、安装、构建、操作的 命令都写入一个脚本，用这个脚本来构建、定制镜像，那么之前提及的无法重复的问题、镜像构建透明性的 问题、体积的问题就都会解决。这个脚本就是 Dockerfile。

- 定制自己的Web服务器

```
#Dockerfile
FROM nginx:latest
RUN echo '<h1>Hello, Kaikeba!</h1>' > /usr/share/nginx/html/index.html
```

```
# 定制镜像
docker build -t nginx:kaikeba .
# 运行
docker run -p 80:80 nginx:kaikeba
```



## 六、定制NodeJS镜像

- 定制一个程序NodeJS镜像

```
npm init -y
npm i koa -s
```

```
 // package.json
{
  "name": "myappp",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "myappp",
  "dependencies": {
    "koa": "^2.7.0"
  }
}
```

```
 // app.js
const Koa = require('koa')
const app = new Koa()
app.use(ctx => {
    ctx.body = 'Hello Docker'
})
app.listen(3000, () => {
    console.log('app started at http://localhost:3000/')
})
```

```
#Dockerfile

#制定node镜像的版本
FROM node:10-alpine 

#移动当前目录下面的文件到app目录下 
ADD . /app/ 

#进入到app目录下面，类似cd 
WORKDIR /app

#安装依赖
RUN npm install

#对外暴露的端口
EXPOSE 3000

#程序启动脚本
CMD ["node", "app.js"]
```

```
# 定制镜像
docker build -t mynode .

# 运行
docker run -p 3000:3000 -d mynode
```



## 七、定制PM2镜像

PM2-利用多核资源

```
# .dockerignore
node_modules
```

```
 // process.yml
apps:
  - script : app.js
    instances: 2
    watch  : true
    env    :
      NODE_ENV: production
 
```

```
# Dockerfile
FROM keymetrics/pm2:latest-alpine
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm config set registry https://registry.npm.taobao.org/ && \
    npm i
EXPOSE 3000

#pm2在docker中使用命令为pm2-docker
CMD ["pm2-runtime", "start", "process.yml"]
```

```
 # 定制镜像
docker build -t mypm2 .

# 运行
docker run -p 3000:3000 -d mypm2
```

## 八、Compose

**简介**

Compose项目是 Docker 官方的开源项目，负责实现对 Docker 容器集群的快速编排。

```
#安装
apt install docker-compose
```

```
mkdir hello-world && cd $_

vi helloword-compose.yml

# helloworld-compose.yml
version: "3.1"
services:
	hello-world:
		image: hello-world
```

```
docker-compose up
```

- 使用docker安装``mongo``l以及``mongo-express``

```
mkdir mongo && cd $_
vi docker-compose.yml

#docker-compose.yml
version: '3.1'
services:
  mongo:
    image: mongo
    restart: always
    ports:
        - 27017:27017
  mongo-express:
    image: mongo-express
    restart: always
    ports:
				- 8000:8081

# 启动
docker-compose up

#浏览器打开
http://{url}:8000/
 
```

![](https://raw.githubusercontent.com/super-lin0/pic/master/img/20200107213005.png)