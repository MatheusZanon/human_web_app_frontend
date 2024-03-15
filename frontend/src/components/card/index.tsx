import { fromNow } from '@/libs';
import styles from './card.module.scss';
import { Search } from 'lucide-react';
import { useState } from 'react';

type CardProps = {
  children?: React.ReactNode;
  image: string;
  title: string;
  text: string;
  categoria: string;
  details_link: string;
  btn: string;
  executions: number;
  last_execution: string;
};

function Card({ image, title, text, categoria, details_link, btn, executions, last_execution, children }: CardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`card ${styles.card}`}>
      <img src={image} alt='dummy' className='card-img-top' />
      <div className='card-body d-flex flex-column justify-content-between'>
        <div className='row'>
          <h5 className='card-title d-flex justify-content-between align-items-center'>
            {title}
            <a href={details_link}>
              <Search width={20} height={20} />
            </a>
          </h5>
          <p className='card-text'>{text}</p>
        </div>
        <div className=''>
          <hr />
          <div className={`${styles.cardTags}`}>
            <p className='fw-bold d-flex justify-content-between'>
              Categoria: <span className='text-muted fw-normal'>{categoria}</span>
            </p>
            <p className='fw-bold d-flex justify-content-between'>
              Execuções: <span className='text-muted fw-normal'>{executions}</span>
            </p>
            <p className='fw-bold d-flex justify-content-between'>
              Ultima execução: <span className='text-muted fw-normal'>{fromNow(new Date(last_execution))}</span>
            </p>
          </div>
          <button type='button' className='btn btn-primary' onClick={() => setShowModal(true)}>
            {btn}
          </button>
        </div>
        <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} id='modalTeste'>
          <div className='modal-dialog modal-dialog-centered'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>{title}</h5>
                <button
                  type='button'
                  className='btn-close'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className='modal-body'>{children}</div>
              <div className='modal-footer'>
                <button type='button' className='btn' data-bs-dismiss='modal' onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
