import Spline from '@splinetool/react-spline';


export default function Robot() {
  return (
    <div className="hidden lg:block absolute top-0 right-0 h-full w-1/2 flex items-center">
  <Spline
    scene="https://prod.spline.design/jPBniYsTyuxRJUnk/scene.splinecode"
    className="w-full h-full"
  />
</div>

  );
}
