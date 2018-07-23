@rem 替换配置。为了能在编译完所做的调整被还原，需要同时实现“modrest.bat”完成恢复工作

@rem 定义要修改的配置内容
@rem %1 = 数据库：jdbc:mysql://localhost:3306/bdc_job
@set jdbcurl=%~1
@if "%jdbcurl%"=="" @set jdbcurl=?
@if "%jdbcurl%"=="?" @set jdbcurl=jdbc:mysql://localhost:3306/bdc_job

@set jdbcdrv=mysql
@set jdbdialect=org.hibernate.dialect.MySQL5Dialect
echo %jdbcurl%|find ":oracle:">nul
@if %errorlevel%==0 (
 @set jdbcdrv=oracle
 @set jdbdialect=org.hibernate.dialect.OracleDialect
)

@rem %2 = 数据库用户：root
@set jdbcuser=%~2
@if "%jdbcuser%"=="" @set jdbcuser=?
@if "%jdbcuser%"=="?" @set jdbcuser=root
@rem %3 = 数据库密码：123456
@set jdbcpwd=%~3
@if "%jdbcpwd%"=="" @set jdbcpwd=?
@if "%jdbcpwd%"=="?" @set jdbcpwd=123456
@rem %4 = CAS服务器登录地址(浏览器重定向用，如果同时可被内外网访问的，内外网地址以空格分开，且与业务服务器地址对应)：默认 http://192.168.10.29:8080/cas/login
@set cassrvlogin=%~4
@if "%cassrvlogin%"=="" @set cassrvlogin=?
@if "%cassrvlogin%"=="?" @set cassrvlogin=http://192.168.10.29:8080/cas/login
@rem %5 = 业务服务器地址(浏览器重定向用，如果同时可被内外网访问的，内外网地址以空格分开)：默认 http://192.168.10.29:8080
@set cascbsrv=%~5
@if "%cascbsrv%"=="" @set cascbsrv=?
@if "%cascbsrv%"=="?" @set cascbsrv=http://192.168.10.29:8080
@rem %6 = 部署操作系统：linux、win
@set dirRoot=%~6
@set optsys=linux
@if "%dirRoot%"=="" @set dirRoot=?
@if "%dirRoot%"=="?" @set dirRoot=/usr/ibase
echo "%dirRoot%"|find ":">nul&&set optsys=win
@set logRoot=%dirRoot%/logs

@rem %7 = 部署服务所在目录：/usr/local/tomcat/webapps
@set appdir=%~7
@if "%appdir%"=="" @set appdir=?
@if "%appdir%"=="?" @set appdir=/usr/local/tomcat/webapps
@rem %8 = CASServer内部地址（CASClient调用的CASServer服务器地址）
@set cassrvtrans=%~8
@if "%cassrvtrans%"=="" @set cassrvtrans=?
@if "%cassrvtrans%"=="?" @set cassrvtrans=http://192.168.10.29:8080/cas
@rem %9 = mongodb服务地址：192.168.10.58
@set mongodb=%~9
@set mongtime=?
@if "%mongodb%"=="" @set mongodb=?
@rem 如果没配置mongodb服务器，设置超时时间为200ms
@if "%mongodb%"=="?" @set mongtime=200
@if "%mongodb%"=="?" @set mongodb=localhost
@rem 参数10=mongodb数据库：ibase2job
@shift /8
@set mongodbname=%~9
@if "%mongodbname%"=="" @set mongodbname=?
@if "%mongodbname%"=="?" @set mongodbname=ibase2job
@rem 参数11=系统标识(如：gzgxj)
@shift /8
@set sysid=%~9
@rem %12 = ActiveMQ服务地址：tcp://192.168.10.58:61616
@shift /8
@set mqurl=%~9
@rem 是否通过消息队列更新mongodb数据
@set updmngbymq=true
@if "%mqurl%"=="?" @set mqurl=
@if "%mqurl%"=="" @set updmngbymq=false
@rem %13 = 数据库架构名
@shift /8
@set dbschema=%~9
@if "%dbschema%"=="?" @set dbschema=
@rem %14 CASClient内部地址（给CASServer调用的CASClient回调地址）：默认与cascbsrv相同
@shift /8
@set cascbsrvtrans=%~9
@if "%cascbsrvtrans%"=="?" @set cascbsrvtrans=
@if "%cascbsrvtrans%"=="" @set cascbsrvtrans=%cascbsrv%
@rem %15 发布界面样式（目前空指默认样式，blue指蓝色主题
@shift /8
@set theme=%~9
@if "%theme%"=="?" @set theme=


@rem @set worksrv=%cascbsrv%/workflowWebService
@rem @set workrec=/mainWeb@%appdir%/mainWeb

@rem 在被编译批处理调用时，此时当前目录为上级目录，可用如下命令切换到当前目录
set orgDir=%cd%
cd /D %~dp0

@echo 编译微信公众平台

@rem 创建备份目录
@rem @md ..\packagelog\configbak\main

@rem 先同步配置
@rem copy ..\logStatistics\logStatisticsService\src\main\resources\logback-comm.xml mainWeb\src\main\resources\logback.xml
@rem wfr mainWeb\src\main\resources\logback.xml -ric:"name=""logModule""\s+value=""[a-zA-Z0-9 :./\\_\-]*""" -t:"name=""logModule"" value=""main""" -encin:UTF-8 -encout:UTF-8
@rem @if not %errorlevel%==0 (
@rem echo %errorlevel%
@rem pause
@rem )

@rem 同步错误页
@rem del /F /Q /S mainService\src\main\webapp\error\*.*
@rem copy /Y mainWeb\src\main\webapp\error\*.* mainService\src\main\webapp\error\

@rem 备份要修改的配置文件
@rem copy xxxWebService\src\main\resources\xxx.properties ..\packagelog\configbak\xxx\
@rem copy xxxWebService\src\main\webapp\WEB-INF\yyy.xml ..\packagelog\configbak\xxx\

@rem @md ..\packagelog\configbak\main\resc
@rem 惠州外网受理系统
@rem @if "%sysid%"=="hzwwsl" (
@rem copy mainWeb\src\main\webapp\images\head\logobg.jpg ..\packagelog\configbak\main\resc\
@rem )

@rem 替换配置项

@rem @if "%jdbcdrv%"=="mysql" (
@rem  copy mainWeb\src\main\resources\mysqlconfig.properties mainWeb\src\main\resources\config.properties
@rem )
@rem @if "%jdbcdrv%"=="oracle" (
@rem  copy mainWeb\src\main\resources\oracleconfig.properties mainWeb\src\main\resources\config.properties
@rem )

@rem wfr mainWeb\src\main\resources\config.properties -ric:"jdbc.url=.*" -t:"jdbc.url=%jdbcurl%" -encin:UTF-8 -encout:UTF-8
@rem @if not %errorlevel%==0 (
@rem  echo %errorlevel%
@rem  pause
@rem )

@set myp=
@set /p myp=是否编译【微信公众平台】页面（直接回车编译，输入n跳过编译）：
@if "%myp%"=="n" goto finish

@rem 编译前端界面页，需要nodejs 6.0以上版本
call npm install
call npm run build

@rem @md ..\main\pubWeb\src\main\webapp\public
@rem @md ..\main\pubWeb\src\main\webapp\public\weixinAuth
@rem xcopy dist\ ..\main\pubWeb\src\main\webapp\public\weixinAuth\ /E /Y

:finish
@rem 在处理完后，恢复之前的目录
cd /D %orgDir%