import * as React from 'react';
import { SVGProps } from 'react';

const SvgCake = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={12} cy={12} r={10} fill="#47D5DC" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.494 7.188A1.839 1.839 0 0 1 9.287 5c1.007 0 1.838.831 1.838 1.838v2.275c.262 0 .525-.044.787-.044.263 0 .482 0 .744.043V6.839c0-1.007.832-1.838 1.838-1.838 1.137 0 2.012 1.05 1.837 2.188l-.481 2.668c1.706.744 3.019 2.056 3.019 3.675v1.006c0 1.357-.875 2.494-2.144 3.238-1.269.788-2.931 1.225-4.813 1.225-1.88 0-3.543-.438-4.812-1.225-1.225-.744-2.1-1.881-2.1-3.237V13.53c0-1.619 1.269-2.931 2.975-3.675l-.481-2.668Zm7.7 3.018.568-3.15c.132-.787-.437-1.531-1.268-1.531-.7 0-1.269.569-1.269 1.269V9.68c-.175-.043-.394-.043-.569-.043-.262 0-.481-.044-.744-.044-.262 0-.525 0-.787.043-.175 0-.394.044-.569.044V6.838c0-.7-.568-1.27-1.268-1.27-.788 0-1.4.745-1.226 1.532l.57 3.15c-1.838.7-3.063 1.925-3.063 3.325v1.006c0 2.144 2.843 3.894 6.343 3.894s6.344-1.75 6.344-3.894v-1.006c.044-1.444-1.181-2.669-3.062-3.369Z"
      fill="#633001"
    />
    <path
      d="M18.3 14.537c0 2.144-2.844 3.894-6.344 3.894-3.5 0-6.343-1.75-6.343-3.894v-1.006h12.73v1.006H18.3Z"
      fill="#FEDC90"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.063 7.1a1.264 1.264 0 0 1 1.225-1.531c.7 0 1.268.568 1.268 1.268v2.888a13.25 13.25 0 0 1 1.357-.088c.437 0 .874.044 1.312.088V6.837c0-.7.569-1.268 1.269-1.268.787 0 1.4.743 1.268 1.531l-.568 3.15c1.837.7 3.106 1.925 3.106 3.325 0 2.144-2.844 3.894-6.344 3.894-3.5 0-6.343-1.75-6.343-3.894 0-1.4 1.225-2.625 3.062-3.325L8.063 7.1Z"
      fill="#D1884F"
    />
    <path
      d="M10.162 13.269c0 .569-.306 1.05-.7 1.05-.393 0-.7-.482-.7-1.05 0-.569.307-1.05.7-1.05.394 0 .7.481.7 1.05ZM15.019 13.269c0 .569-.307 1.05-.7 1.05-.394 0-.7-.482-.7-1.05 0-.569.306-1.05.7-1.05.393 0 .7.481.7 1.05Z"
      fill="#633001"
    />
  </svg>
);

export default SvgCake;