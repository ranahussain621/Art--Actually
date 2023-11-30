import { useEffect, useState } from 'react';
import './pagination.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function Pagination(props) {
 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [props.totalPage]);

  const handleClick = (event) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute('href');
    if (href === '#!+1') {
      setCurrentPage(currentPage + 1);
      props.nextPage();
    } else if (href === '#!-1') {
      setCurrentPage(currentPage - 1);
      props.previousPage();
    } else {
      const go = href.replace('#!', '');
      setCurrentPage(parseInt(go, 10));
      props.currentPageValue(parseInt(go, 10));
    }
  };

  const renderPageLink = (page) => {
    const className = page === currentPage ? 'cdp_i active' : 'cdp_i';
    return (
      <a href={`#!${page}`} className={className} onClick={handleClick}>
        {page}
      </a>
    );
  };

 

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-evenly">

       <div className="align-items-center me-5" style={{ marginTop: '70px' }}>
          <p className="m-0 pe-3 p-2 text-muted" style={{ background: 'none', color: 'blue' }}>
            Rows Per Page : {props.currentItems?.length}  <span>
           <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" fill="currentColor" class="bi bi-caret-down-fill text-dark" viewBox="0 0 16 16">
     <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
     </svg>

          </span>
          </p>
        </div>

        <div className="align-items-center me-5" style={{ marginTop: '70px' }}>
          <p className="m-0 pe-3 p-2 text-muted" style={{ background: 'none', color: 'blue' }}>
            
            1 - 5 of {props.data?.length}
          </p>
        </div> 
        <div className="content_detail__pagination cdp mb-1" actpage={currentPage} >
          <div className="w-auto inner-data" style={{background:'none'}}>
            <div className="d-flex align-items-center">
              <a href="#!-1" className="cdp_i" onClick={handleClick}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </a>
              {Array.from({ length: props.totalPage }, (_, i) => renderPageLink(i + 1))}
              <a href="#!+1" className="cdp_i" onClick={handleClick}>
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
