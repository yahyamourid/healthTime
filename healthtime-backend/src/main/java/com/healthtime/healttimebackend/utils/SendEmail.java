package com.healthtime.healttimebackend.utils;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class SendEmail {
    @Autowired
    private JavaMailSender mailSender;

    @Async
    public void sendEmail(String to, String subject, String body) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true);
        mailSender.send(message);
    }

    @Async
    public void sendAcceptEmail(String to, String nom, String prenom) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        String body = "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; line-height: 1.6; padding: 20px; }"
                +
                ".container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 10px; }"
                +
                ".header { font-size: 24px; font-weight: bold; color: #4CAF50; margin-bottom: 20px; text-align: center; }"
                +
                ".content { font-size: 16px; margin-bottom: 20px; }" +
                ".footer { font-size: 12px; color: #777; margin-top: 30px; text-align: center; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='container'>" +
                "<div class='header'>Félicitations !</div>" +
                "<div class='content'>" +
                "<p>Bonjour " + nom + " " + prenom + ",</p>" +
                "<p>Nous sommes ravis de vous informer que votre demande a été acceptée par HealthTime.</p>" +
                "<p>Merci de nous avoir fait confiance !</p>" +
                "</div>" +
                "<div class='footer'>" +
                "<p>HealthTime - Votre partenaire pour un avenir en santé</p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";

        helper.setTo(to);
        helper.setSubject("Demande Acceptée - HealthTime");
        helper.setText(body, true);
        mailSender.send(message);
    }

    @Async
public void sendRefuseEmail(String to, String nom, String prenom) throws MessagingException {
    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

    String body = "<html>" +
            "<head>" +
            "<style>" +
            "body { font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; line-height: 1.6; padding: 20px; }" +
            ".container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border: 1px solid #ddd; border-radius: 10px; }" +
            ".header { font-size: 24px; font-weight: bold; color: #f44336; margin-bottom: 20px; text-align: center; }" +
            ".content { font-size: 16px; margin-bottom: 20px; }" +
            ".footer { font-size: 12px; color: #777; margin-top: 30px; text-align: center; }" +
            "</style>" +
            "</head>" +
            "<body>" +
            "<div class='container'>" +
            "<div class='header'>Demande Refusée</div>" +
            "<div class='content'>" +
            "<p>Bonjour " + nom + " " + prenom + ",</p>" +
            "<p>Nous sommes désolés de vous informer que votre demande n’a pas été acceptée par HealthTime.</p>" +
            "<p>Si vous avez des questions ou souhaitez plus d’informations, n’hésitez pas à nous contacter.</p>" +
            "<p>Merci pour votre intérêt envers HealthTime.</p>" +
            "</div>" +
            "<div class='footer'>" +
            "<p>HealthTime - Nous espérons vous revoir bientôt.</p>" +
            "</div>" +
            "</div>" +
            "</body>" +
            "</html>";

    helper.setTo(to);
    helper.setSubject("Demande Refusée - HealthTime");
    helper.setText(body, true);
    mailSender.send(message);
}

}