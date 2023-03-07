# Apache-Ambari-WEB-ZH

一、适用说明

基于Apache Ambari 2.7.5版本进行汉化，2.7.x基本都可适用。

此代码仓还包含了HA过程中的一些自定义配置，若诸位能用到该配置，可自行获取，若有不适之处，欢迎指出。


二、使用方法如下：
message.js 因为ambari的前端是一个纯前端的工程，所以如果你要是想使用的话需要重新编译这个包去使用，在ambari-web上brunch build即可，然后把生成public文件夹覆盖到ambari-server的/usr/lib/ambari-server/web目录即可。 或者下载https://github.com/LiJie20190102/Apache-Ambari-WEB-ZH/blob/master/public.zip直接使用

三、ambari-web 构建编译方法

1、查看ambari-web的工程目录可以知道，这是一个基于nodsjs的工程，构建工具使用brunch,有兴趣的同学可以详细学习一下brunch的使用，对于不是做前端的同学可以简单的使用如下命令进行安装，构建编译之前需要你的环境中有nodejs V8，建议使用NVM 安装, 构建环境建议使用Fedora30+操作系统

Shell> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

Shell> nvm install v8.17.0

Shell> git clone https://github.com/liuwenru/Apache-Ambari-ZH.git

Shell> cd Apache-Ambari-ZH/ambari-web 

Shell> npm install 

Shell> npm install -g brunch@1.7

SHell> brunch build 

构建完成后，publibc目录就是可以直接使用的版本，拷贝到/usr/lib/ambari-server/web上重启ambari-server即可。

2、基于BigTop去打包构建
