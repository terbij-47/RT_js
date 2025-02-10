#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>
#include <opencv2/imgproc.hpp>
#include <string>
#include <fstream>
#include <iostream>
#include <stdio.h>
#include <Windows.h>

#ifndef __header_h_
#define __header_h_

class writer
{
  std::string FName;
  std::string Format;
  std::string Name;     // file name without format
  std::string JSFName;  // ___.js

  bool parseName( std::string ToParse )
  {
    FName = ToParse;
    int DotPos = (int)ToParse.find_last_of(".");
    if (DotPos == -1)
    {
      Format = "";
      JSFName = "";
      return false;
    }
    Name = ToParse.substr(0, DotPos);
    Format = ToParse.substr(DotPos + 1);
    JSFName = "../../imgs/" + Name + "_" + Format + ".js";
    return true;
  }

  public:
    writer( void )
    {
    }

    bool rewrite( std::string FileName )
    {
      if (!parseName(FileName))
        return false;
      return img_formImage();
    }

  private:

    bool img_formImage( void )
    {
      cv::Mat Image = cv::imread("origin/" + FName);
      if (Image.empty())
        return false;
    
      int DataSize = Image.channels() * Image.total();

      std::ofstream File(JSFName);
      std::string Buf = "let " + Name + "_" + Format + " = new img(" + std::to_string(Image.cols) + ", " +
      std::to_string(Image.rows) + ", '" + Format + "'" + ",\n    [\n        ";
        for (int i = 0, b = 50; i < DataSize; i++, b--)
        {
          Buf += std::to_string(Image.data[i] / 255.f) + ", ";
          if (!b)
          {
            Buf += "\n        ";
            b = 50;
          }
        }
      Buf += "\n    ]\n);";
    
      File.write(Buf.c_str(), Buf.size());
      File.close();

      if (File.bad())
        return false;
      return true;
    }
};


#endif /* __header_h_ */


