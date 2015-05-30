#lang racket

(require (planet aml/rosetta))

(define (breather p a u0 u1 m v0 v1 n)
  (let ((r (- 1 (expt a 2))))
    (let ((w (sqrt r)))
      (map-division
       (lambda (u v)
         (let ((sinv (sin v))
               (cosv (cos v))
               (sinwv (sin (* w v)))
               (coswv (cos (* w v)))
               (sinhau (sinh (* a u)))
               (coshau (cosh (* a u))))
           (let ((d (* a (+ (expt (* w coshau) 2)
                            (expt (* a sinwv) 2)))))
             (+xyz p
                   (+ (- u) (/ (* 2 r coshau sinhau) d))
                   (/ (* 2 w coshau (- (- (* w cosv coswv)) 
                                       (* sinv sinwv))) 
                      d)
                   (/ (* 2 w coshau (+ (- (* w sinv coswv)) 
                                       (* cosv sinwv)))
                      d)))))
       u0 u1 m
       v0 v1 n))))

(backend opengl)

(define m 
  (surface-grid
   (breather (xyz 0 0 0) 0.4 -13.2 13.2 200 -37.4 37.4 200)))

#;(defmodel (breather)
  (surface-grid
   (breather (xyz 0 0 0) 0.4 -13.2 13.2 200 -37.4 37.4 200))
  (view (xyz 67.3500 53.5526 62.1151) (xyz -34.2210 -27.8034 -32.1278) 197))