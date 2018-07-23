@rem �滻���á�Ϊ�����ڱ����������ĵ�������ԭ����Ҫͬʱʵ�֡�modrest.bat����ɻָ�����

@rem ����Ҫ�޸ĵ���������
@rem %1 = ���ݿ⣺jdbc:mysql://localhost:3306/bdc_job
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

@rem %2 = ���ݿ��û���root
@set jdbcuser=%~2
@if "%jdbcuser%"=="" @set jdbcuser=?
@if "%jdbcuser%"=="?" @set jdbcuser=root
@rem %3 = ���ݿ����룺123456
@set jdbcpwd=%~3
@if "%jdbcpwd%"=="" @set jdbcpwd=?
@if "%jdbcpwd%"=="?" @set jdbcpwd=123456
@rem %4 = CAS��������¼��ַ(������ض����ã����ͬʱ�ɱ����������ʵģ���������ַ�Կո�ֿ�������ҵ���������ַ��Ӧ)��Ĭ�� http://192.168.10.29:8080/cas/login
@set cassrvlogin=%~4
@if "%cassrvlogin%"=="" @set cassrvlogin=?
@if "%cassrvlogin%"=="?" @set cassrvlogin=http://192.168.10.29:8080/cas/login
@rem %5 = ҵ���������ַ(������ض����ã����ͬʱ�ɱ����������ʵģ���������ַ�Կո�ֿ�)��Ĭ�� http://192.168.10.29:8080
@set cascbsrv=%~5
@if "%cascbsrv%"=="" @set cascbsrv=?
@if "%cascbsrv%"=="?" @set cascbsrv=http://192.168.10.29:8080
@rem %6 = �������ϵͳ��linux��win
@set dirRoot=%~6
@set optsys=linux
@if "%dirRoot%"=="" @set dirRoot=?
@if "%dirRoot%"=="?" @set dirRoot=/usr/ibase
echo "%dirRoot%"|find ":">nul&&set optsys=win
@set logRoot=%dirRoot%/logs

@rem %7 = �����������Ŀ¼��/usr/local/tomcat/webapps
@set appdir=%~7
@if "%appdir%"=="" @set appdir=?
@if "%appdir%"=="?" @set appdir=/usr/local/tomcat/webapps
@rem %8 = CASServer�ڲ���ַ��CASClient���õ�CASServer��������ַ��
@set cassrvtrans=%~8
@if "%cassrvtrans%"=="" @set cassrvtrans=?
@if "%cassrvtrans%"=="?" @set cassrvtrans=http://192.168.10.29:8080/cas
@rem %9 = mongodb�����ַ��192.168.10.58
@set mongodb=%~9
@set mongtime=?
@if "%mongodb%"=="" @set mongodb=?
@rem ���û����mongodb�����������ó�ʱʱ��Ϊ200ms
@if "%mongodb%"=="?" @set mongtime=200
@if "%mongodb%"=="?" @set mongodb=localhost
@rem ����10=mongodb���ݿ⣺ibase2job
@shift /8
@set mongodbname=%~9
@if "%mongodbname%"=="" @set mongodbname=?
@if "%mongodbname%"=="?" @set mongodbname=ibase2job
@rem ����11=ϵͳ��ʶ(�磺gzgxj)
@shift /8
@set sysid=%~9
@rem %12 = ActiveMQ�����ַ��tcp://192.168.10.58:61616
@shift /8
@set mqurl=%~9
@rem �Ƿ�ͨ����Ϣ���и���mongodb����
@set updmngbymq=true
@if "%mqurl%"=="?" @set mqurl=
@if "%mqurl%"=="" @set updmngbymq=false
@rem %13 = ���ݿ�ܹ���
@shift /8
@set dbschema=%~9
@if "%dbschema%"=="?" @set dbschema=
@rem %14 CASClient�ڲ���ַ����CASServer���õ�CASClient�ص���ַ����Ĭ����cascbsrv��ͬ
@shift /8
@set cascbsrvtrans=%~9
@if "%cascbsrvtrans%"=="?" @set cascbsrvtrans=
@if "%cascbsrvtrans%"=="" @set cascbsrvtrans=%cascbsrv%
@rem %15 ����������ʽ��Ŀǰ��ָĬ����ʽ��blueָ��ɫ����
@shift /8
@set theme=%~9
@if "%theme%"=="?" @set theme=


@rem @set worksrv=%cascbsrv%/workflowWebService
@rem @set workrec=/mainWeb@%appdir%/mainWeb

@rem �ڱ��������������ʱ����ʱ��ǰĿ¼Ϊ�ϼ�Ŀ¼���������������л�����ǰĿ¼
set orgDir=%cd%
cd /D %~dp0

@echo ����΢�Ź���ƽ̨

@rem ��������Ŀ¼
@rem @md ..\packagelog\configbak\main

@rem ��ͬ������
@rem copy ..\logStatistics\logStatisticsService\src\main\resources\logback-comm.xml mainWeb\src\main\resources\logback.xml
@rem wfr mainWeb\src\main\resources\logback.xml -ric:"name=""logModule""\s+value=""[a-zA-Z0-9 :./\\_\-]*""" -t:"name=""logModule"" value=""main""" -encin:UTF-8 -encout:UTF-8
@rem @if not %errorlevel%==0 (
@rem echo %errorlevel%
@rem pause
@rem )

@rem ͬ������ҳ
@rem del /F /Q /S mainService\src\main\webapp\error\*.*
@rem copy /Y mainWeb\src\main\webapp\error\*.* mainService\src\main\webapp\error\

@rem ����Ҫ�޸ĵ������ļ�
@rem copy xxxWebService\src\main\resources\xxx.properties ..\packagelog\configbak\xxx\
@rem copy xxxWebService\src\main\webapp\WEB-INF\yyy.xml ..\packagelog\configbak\xxx\

@rem @md ..\packagelog\configbak\main\resc
@rem ������������ϵͳ
@rem @if "%sysid%"=="hzwwsl" (
@rem copy mainWeb\src\main\webapp\images\head\logobg.jpg ..\packagelog\configbak\main\resc\
@rem )

@rem �滻������

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
@set /p myp=�Ƿ���롾΢�Ź���ƽ̨��ҳ�棨ֱ�ӻس����룬����n�������룩��
@if "%myp%"=="n" goto finish

@rem ����ǰ�˽���ҳ����Ҫnodejs 6.0���ϰ汾
call npm install
call npm run build

@rem @md ..\main\pubWeb\src\main\webapp\public
@rem @md ..\main\pubWeb\src\main\webapp\public\weixinAuth
@rem xcopy dist\ ..\main\pubWeb\src\main\webapp\public\weixinAuth\ /E /Y

:finish
@rem �ڴ�����󣬻ָ�֮ǰ��Ŀ¼
cd /D %orgDir%