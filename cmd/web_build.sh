#!/bin/bash
# 该脚本用于前端部署

echo "排除node_modules目录,将./web/client/dist前端文件打包为dist.tgz压缩包完成之后删除./web/client/dist所有文件"
tar -czvf dist.tgz --exclude=node_modules -C ./client/dist . --remove-files

echo "打包后目录"
ls
echo "传输./cmd/dir.sh目录script与dist.tgz前端压缩包发送至主机47.120.5.83的/home/nginx/html/temp目录下"
sshpass -e scp -o stricthostkeychecking=no -r ./cmd/dir.sh dist.tgz root@47.120.5.83:/home/nginx/html/temp
sshpass -e scp -o stricthostkeychecking=no -r ./cmd/dir.sh dist.tgz root@192.168.0.158:/home/nginx/html/temp

echo "进入主机47.120.5.83的/home/nginx/html/web目录下执行dir.sh目录script与解压dist.tgz前端压缩包,完成后删除前端压缩包"
sshpass -e ssh -o stricthostkeychecking=no root@47.120.5.83 'cd /home/nginx/html/temp && bash dir.sh && tar -xzvf dist.tgz -C /home/nginx/html/web && rm -rf /home/nginx/html/temp'
sshpass -e ssh -o stricthostkeychecking=no root@192.168.0.158 'cd /home/nginx/html/temp && bash dir.sh && tar -xzvf dist.tgz -C /home/nginx/html/web && rm -rf /home/nginx/html/temp'
