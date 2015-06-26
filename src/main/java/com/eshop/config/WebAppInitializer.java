package com.eshop.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

/**
 * web.xml
 */
public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        super.onStartup(servletContext);
        servletContext.addListener(new HttpSessionEventPublisher());
       /* //映射webapprootkey变量
        servletContext.setInitParameter("webAppRootKey", "store.root");
        //增加Log4j
        servletContext.setInitParameter("log4jConfigLocation", "classpath:log4j.xml");
        servletContext.addListener(Log4jConfigListener.class);*/

    }

    /**
     * 加载Spring 配置类
     * @return
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{RootConfig.class};
    }

    /**
     * 加载Spring MVC 配置类
     * @return
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{DispatcherConfig.class};
    }

    /**
     * 映射Spring MVC 路径
     * @return
     */
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
    
    /*@Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding("UTF-8");
        characterEncodingFilter.setForceEncoding(true);
        return new Filter[] {characterEncodingFilter};
    }
    
    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {        
        registration.setInitParameter("spring.profiles.active", "default");
    }*/

}
