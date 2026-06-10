CREATE DATABASE IF NOT EXISTS whatsapp_reminder_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE whatsapp_reminder_db;

CREATE TABLE IF NOT EXISTS appointments (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  customer_name VARCHAR(150) NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  appointment_time DATETIME NOT NULL,
  confirmation_sent TINYINT(1) NOT NULL DEFAULT 0,
  reminder_sent TINYINT(1) NOT NULL DEFAULT 0,
  confirmation_sent_at DATETIME NULL DEFAULT NULL,
  reminder_sent_at DATETIME NULL DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_appointment_time (appointment_time),
  INDEX idx_reminder_sent (reminder_sent)
);

CREATE TABLE IF NOT EXISTS message_logs (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  appointment_id INT UNSIGNED NOT NULL,
  message_type VARCHAR(30) NOT NULL,
  channel VARCHAR(30) NOT NULL DEFAULT 'mock',
  status VARCHAR(30) NOT NULL DEFAULT 'sent',
  message_body TEXT NOT NULL,
  error_message TEXT NULL,
  sent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_message_logs_appointment
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
    ON DELETE CASCADE
);