-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ruonline
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ruonline
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ruonline` DEFAULT CHARACTER SET utf8 ;
USE `ruonline` ;

-- -----------------------------------------------------
-- Table `ruonline`.`perfil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruonline`.`perfil` (
  `id` INT NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ruonline`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruonline`.`usuario` (
  `id` INT NOT NULL,
  `login` VARCHAR(30) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  `perfil_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) VISIBLE,
  UNIQUE INDEX `senha_UNIQUE` (`senha` ASC) VISIBLE,
  INDEX `fk_usuario_perfil_idx` (`perfil_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_perfil`
    FOREIGN KEY (`perfil_id`)
    REFERENCES `ruonline`.`perfil` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ruonline`.`pagamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruonline`.`pagamento` (
  `id` INT NOT NULL,
  `valor` DECIMAL(10,2) NOT NULL,
  `dataHora` DATETIME NOT NULL,
  `status` TINYINT NULL,
  `metodoPagamento` ENUM('Pix', 'Saldo') NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Pagamento_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Pagamento_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `ruonline`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ruonline`.`autenticacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruonline`.`autenticacao` (
  `id` INT NOT NULL,
  `dataHora` DATETIME NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Autenticacao_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_Autenticacao_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `ruonline`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ruonline`.`ficha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruonline`.`ficha` (
  `id` INT NOT NULL,
  `valor` DECIMAL(10,2) NULL,
  `status` TINYINT NULL,
  `usuario_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_ficha_usuario1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_ficha_usuario1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `ruonline`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ruonline`.`noticia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruonline`.`noticia` (
  `id` INT NOT NULL,
  `titulo` VARCHAR(255) NULL,
  `conteudo` TEXT NULL,
  `dataPublicacao` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ruonline`.`cardapio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruonline`.`cardapio` (
  `id` INT NOT NULL,
  `data` DATE NULL,
  `refeicaoTradicional` VARCHAR(255) NULL,
  `refeicaoVegetariana` VARCHAR(255) NULL,
  `horarioFuncionamento` DATETIME NULL,
  `noticia_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cardapio_noticia1_idx` (`noticia_id` ASC) VISIBLE,
  CONSTRAINT `fk_cardapio_noticia1`
    FOREIGN KEY (`noticia_id`)
    REFERENCES `ruonline`.`noticia` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ruonline`.`cardapioSemanal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruonline`.`cardapioSemanal` (
  `id` INT NOT NULL,
  `semana` DATE NULL,
  `diaDaSemana` VARCHAR(45) NULL,
  `refeicaoTradicionalDoDia` VARCHAR(255) NULL,
  `refeicaoVegetarianaDoDia` VARCHAR(255) NULL,
  `cardapio_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cardapioSemanal_cardapio1_idx` (`cardapio_id` ASC) VISIBLE,
  CONSTRAINT `fk_cardapioSemanal_cardapio1`
    FOREIGN KEY (`cardapio_id`)
    REFERENCES `ruonline`.`cardapio` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ruonline`.`menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ruonline`.`menu` (
  `id` INT NOT NULL,
  `nomeDoPrato` VARCHAR(255) NULL,
  `descricao` TEXT NULL,
  `tipo` ENUM('tradicional', 'vegetariano') NULL,
  `cardapioSemanal_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_menu_cardapioSemanal1_idx` (`cardapioSemanal_id` ASC) VISIBLE,
  CONSTRAINT `fk_menu_cardapioSemanal1`
    FOREIGN KEY (`cardapioSemanal_id`)
    REFERENCES `ruonline`.`cardapioSemanal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
