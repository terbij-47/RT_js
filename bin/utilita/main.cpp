#include "writer.h"

int main(int argc, char *argv[])
{
  std::string FileName = "normaltest.jpg";

  writer Wr;
  
  bool res = Wr.rewrite(FileName);
  return 0;
}
