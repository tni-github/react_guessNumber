import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  state = {
    result: `Игра с угадыванием числа. 
    Введите число от ${this.props.min} до ${this.props.max}.`,
    userNumber: '',
    randomNumber:
      Math.floor((Math.random() * (this.props.max - this.props.min + 1))) +
      this.props.min,
    count: 0,
    gameEnd: false,
  };
  // this.handleSubmit = this.handleSubmit.bind(this);

  handleSubmit = e => {
    e.preventDefault();

    this.setState(state => {
      if (this.state.userNumber && this.state.userNumber >= this.props.min &&
        this.state.userNumber <= this.props.max) {
        return {
          count: ++state.count,
        };
      }
    });

    this.setState(state => {
      if (this.state.gameEnd !== true) {
        console.log(state);
        if (!this.state.userNumber && this.state.count === 0 ||
          !this.state.userNumber) {
          return {
            result: `Вы ничего не ввели. Введите число от 
            ${this.props.min} до ${this.props.max}`
          };
        } else if (state.userNumber < this.props.min ||
          state.userNumber > this.props.max) {
          return {
            result: `Вы ввели число за пределами диапазона от 
              ${this.props.min} до ${this.props.max}. Повторите ввод.`,
            userNumber: '',
          };
        } else if (state.userNumber > state.randomNumber) {
          return {
            result: `${state.userNumber} больше загаданного, попытка № 
            ${this.state.count}`,
            userNumber: '',
          };
        } else if (state.userNumber < state.randomNumber) {
          return {
            result: `${state.userNumber} меньше загаданного, попытка № 
            ${this.state.count}`,
            userNumber: '',
          };
        } else {
          return {
            result: `Вы угадали, загаданное число ${state.userNumber},
          общее число попыток ${state.count}`,
            userNumber: '',
            gameEnd: true,
          };
        }
      } else {
        return {
          result: `Новая игра с угадыванием числа.
                  Введите число от ${this.props.min} до ${this.props.max}.`,
          randomNumber:
            Math.floor((Math.random() * (this.props.max -
              this.props.min + 1))) +
            this.props.min,
          count: 0,
          gameEnd: false,
        };
      }
    }
    );
  };

  handleChange = e => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  render() {
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>
          <label className={style.label} htmlFor='user_number'>
            Угадай число
          </label>

          <input
            className={style.input}
            type='number'
            onChange={this.handleChange}
            value={this.state.userNumber}
            disabled={this.state.gameEnd}
          />

          <button className={style.btn}>
            {this.state.gameEnd === false ?
              'Угадать' : 'Сыграть ещё'}
          </button>
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
